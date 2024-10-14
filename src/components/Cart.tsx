import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addToCart, removeFromCart, setItemQuantity, hideCart } from '@/store/cartSlice';
import { createOrder } from '@/store/orderSlice';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible);

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
    const [error, setError] = useState('');

    const handleCheckout = () => {
        // Validar la información de envío
        if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.paymentMethod) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const order = {
            id: Date.now(),
            items: cartItems.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            total: parseFloat(totalPrice),
            shipping: shippingInfo,
        };
        
        dispatch(createOrder(order));
        dispatch(hideCart());
        dispatch({ type: 'cart/clearCart' });

        // Limpiar el formulario después de crear la orden
        setShippingInfo({ name: '', address: '', paymentMethod: '' });
        setCheckoutFormVisible(false);
        setError(''); // Reiniciar el mensaje de error
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
        <div className={`border p-4 ${isCartVisible ? 'block' : 'hidden'} fixed right-0 top-16 w-1/3`}>
            <h2 className="text-xl font-bold">Carrito</h2>
            {Object.keys(productCounts).length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <ul className="flex flex-col space-y-2">
                        {Object.values(productCounts).map((item) => (
                            <li key={item.product.id} className="flex items-center">
                                <img src={item.product.image} alt={item.product.title} className="h-12 w-12 object-cover mr-2" />
                                <span className="flex-1">{item.product.title} - ${item.product.price} x {item.quantity}</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleAddQuantity(item.product.id)} className="bg-blue-500 text-white rounded px-2 py-1">+</button>
                                    <button onClick={() => handleRemoveQuantity(item.product.id)} className="bg-red-500 text-white rounded px-2 py-1">-</button>
                                    <button onClick={() => dispatch(removeFromCart(item.product.id))} className="bg-gray-400 text-white rounded px-2 py-1">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold">Total: ${totalPrice}</p>
                    {error && <p className="text-red-500">{error}</p>}
                    {isCheckoutFormVisible ? (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Información de Envío</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                className="border p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                name="paymentMethod"
                                placeholder="Método de Pago"
                                value={shippingInfo.paymentMethod}
                                onChange={handleInputChange}
                                className="border p-2 w-full mb-2"
                            />
                            <button onClick={handleCheckout} className="mt-2 bg-green-500 text-white rounded px-4 py-2">Confirmar Orden</button>
                        </div>
                    ) : (
                        <button onClick={handleShowCheckoutForm} className="mt-4 bg-green-500 text-white rounded px-4 py-2">Checkout</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
