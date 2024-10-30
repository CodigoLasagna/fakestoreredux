import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addToCart, removeFromCart, setItemQuantity, hideCart, loadCart } from '@/store/cartSlice';
import { createOrder } from '@/store/orderSlice';
import { parseCookies } from 'nookies';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible);
    const [error, setError] = useState('');

    // Estado para manejar el total
    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);

    const productCounts: { [key: number]: { product: any; quantity: number } } = {};

    cartItems.forEach(item => {
        const { id } = item.product;
        if (productCounts[id]) {
            productCounts[id].quantity += item.quantity;
        } else {
            productCounts[id] = { product: item.product, quantity: item.quantity };
        }
    });

    const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', paymentMethod: '' });
    const [isCheckoutFormVisible, setCheckoutFormVisible] = useState(false);

    // Función para obtener el carrito desde la API
const fetchCart = async () => {
    const cookies = parseCookies();
    const userId = cookies.authToken;

    if (!userId) {
        setError('No se pudo encontrar el ID de usuario. Por favor, inicie sesión nuevamente.');
        return;
    }

    try {
        const response = await fetch('/api/cart/getCart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userId}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al obtener el carrito:', errorData);
            setError('Error al obtener el carrito. Por favor, inténtelo de nuevo.');
            return;
        }

        const cartData = await response.json();

        // Asegúrate de que cartData.items tenga la estructura correcta
        if (Array.isArray(cartData.items)) {
            // Despachar los items del carrito a Redux
            const itemsToDispatch = cartData.items.map((item: any) => ({
                product: item.product,
                quantity: item.quantity,
            }));
            dispatch(loadCart(itemsToDispatch)); // Usar loadCart para cargar todos los elementos
        } else {
            console.error('La respuesta de cartData.items no es un array:', cartData.items);
            setError('Error en los datos del carrito. Por favor, inténtelo de nuevo.');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        setError('Error en la solicitud. Por favor, inténtelo de nuevo.');
    }
};

    // Efecto que se ejecuta al montar el componente
    useEffect(() => {
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        // Validar la información de envío
        if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.paymentMethod) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const order = {
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            })),
            total: parseFloat(totalPrice),
            name: shippingInfo.name,
            address: shippingInfo.address,
            paymentMethod: shippingInfo.paymentMethod,
        };

        // Hacer la solicitud POST a la API
        try {
            const response = await fetch('/api/orders/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al crear la orden:', errorData);
                setError('Error al crear la orden. Por favor, inténtelo de nuevo.');
                return;
            }

            // Limpiar el carrito y el formulario después de crear la orden
            dispatch(hideCart());
            dispatch({ type: 'cart/clearCart' });
            setShippingInfo({ name: '', address: '', paymentMethod: '' });
            setCheckoutFormVisible(false);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error en la solicitud. Por favor, inténtelo de nuevo.');
        }
    };

    const handleAddQuantity = (id: number) => {
        dispatch(setItemQuantity({ id, quantity: productCounts[id].quantity + 1 }));
    };

    const handleRemoveQuantity = (id: number) => {
        const newQuantity = productCounts[id].quantity - 1;
        if (newQuantity > 0) {
            dispatch(setItemQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleShowCheckoutForm = () => {
        setCheckoutFormVisible(true);
        setError(''); // Reiniciar el mensaje de error al mostrar el formulario
    };

    return (
        <div className={`border border-gray-700 bg-[#2C3A47] p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${isCartVisible ? 'translate-x-0' : 'translate-x-full'} fixed right-0 top-16 w-1/3`}>
            <h2 className="text-2xl font-bold text-[#ECB22E] mb-4">Carrito</h2>
            {Object.keys(productCounts).length === 0 ? (
                <p className="text-white">No hay productos en el carrito.</p>
            ) : (
                <div>
                    <ul className="flex flex-col space-y-4">
                        {Object.values(productCounts).map((item) => (
                            <li key={item.product.id} className="flex items-center">
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    className="h-12 w-12 object-cover rounded-lg mr-4"
                                />
                                <span className="flex-1 text-white">{item.product.title} - ${item.product.price} x {item.quantity}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleAddQuantity(item.product.id)}
                                        className="bg-[#4D9BE6] text-white rounded-lg px-3 py-1 transition-transform duration-150 hover:scale-105"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleRemoveQuantity(item.product.id)}
                                        className="bg-[#F23F42] text-white rounded-lg px-3 py-1 transition-transform duration-150 hover:scale-105"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.product.id))}
                                        className="bg-gray-500 text-white rounded-lg px-3 py-1 transition-transform duration-150 hover:scale-105"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold text-[#81DC26] mt-4">Total: ${totalPrice}</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {isCheckoutFormVisible ? (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-white">Información de Envío</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                                className="border border-gray-600 bg-[#1B232B] text-white p-2 w-full mb-3 rounded-lg"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                className="border border-gray-600 bg-[#1B232B] text-white p-2 w-full mb-3 rounded-lg"
                            />
                            <input
                                type="text"
                                name="paymentMethod"
                                placeholder="Método de Pago"
                                value={shippingInfo.paymentMethod}
                                onChange={handleInputChange}
                                className="border border-gray-600 bg-[#1B232B] text-white p-2 w-full mb-3 rounded-lg"
                            />
                            <button
                                onClick={handleCheckout}
                                className="bg-[#81DC26] text-white rounded-lg px-4 py-2 mt-4 w-full transition-transform duration-150 hover:scale-105"
                            >
                                Confirmar Orden
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleShowCheckoutForm}
                            className="bg-[#81DC26] text-black font-semibold rounded-lg px-4 py-2 mt-4 w-full transition-transform duration-150 hover:scale-105"
                        >
                            Proceder a Checkout
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
