'use client';

import React from 'react';
import { useAppSelector } from '@/store/store';
import { Order } from '@/store/orderSlice'; // Asegúrate de importar la interfaz Order

const OrdersPage: React.FC = () => {
    const orders = useAppSelector((state) => state.orders.orders); // Obtener las órdenes del estado

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Órdenes</h1>
            {orders.length === 0 ? (
                <p>No hay órdenes realizadas.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order: Order) => ( // Especifica el tipo Order
                        <li key={order.id} className="border p-4 rounded">
                            <h2 className="font-semibold">Orden ID: {order.id}</h2>
                            <p>Total: ${order.total.toFixed(2)}</p>
                            <h3 className="font-semibold">Productos:</h3>
                            <ul>
                                {order.items.map((item, index) => ( // Puedes dejar item y index como 'any' si no necesitas tipos específicos
                                    <li key={index}>
                                        Producto ID: {item.productId} - Cantidad: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
