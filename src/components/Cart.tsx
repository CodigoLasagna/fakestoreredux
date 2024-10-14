// components/Cart.tsx
'use client';
import React from 'react';
import { useAppSelector } from '@/store/store';

const Cart: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible); // Obtener visibilidad del carrito

    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className={`border p-4 ${isCartVisible ? 'block' : 'hidden'} fixed right-0 top-16 w-1/3`}>
            <h2 className="text-xl font-bold">Carrito</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.product.id}>
                                {item.product.title} - ${item.product.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold">Total: ${totalPrice}</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
