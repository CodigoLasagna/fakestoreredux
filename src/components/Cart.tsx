import React from 'react';
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

    const handleCheckout = () => {
        const order = {
            id: Date.now(), // O usar un ID más adecuado
            items: cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity })),
            total: parseFloat(totalPrice),
        };
        
        dispatch(createOrder(order)); // Crear la orden
        dispatch(hideCart()); // Ocultar el carrito
        dispatch({ type: 'cart/clearCart' }); // Limpiar el carrito
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
                    <button onClick={handleCheckout} className="mt-4 bg-green-500 text-white rounded px-4 py-2">Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
