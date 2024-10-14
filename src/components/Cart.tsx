// components/Cart.tsx
'use client';
import React from 'react';
import { useAppSelector } from '@/store/store';

const Cart: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible); // Obtener visibilidad del carrito

    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2); // Asegurarse de que el total tenga 2 decimales

    // Crear un objeto para agrupar productos y sumar cantidades
    const productCounts: { [key: number]: { product: any; quantity: number } } = {};

    cartItems.forEach(item => {
        const { id } = item.product;
        if (productCounts[id]) {
            productCounts[id].quantity += item.quantity; // Sumar cantidad si ya existe
        } else {
            productCounts[id] = { product: item.product, quantity: item.quantity }; // Agregar nuevo producto
        }
    });

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
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold">Total: ${totalPrice}</p> {/* Muestra el total con 2 decimales */}
                </div>
            )}
        </div>
    );
};

export default Cart;
