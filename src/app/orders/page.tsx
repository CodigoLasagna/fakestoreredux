'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/store';
import { Order } from '@/store/orderSlice'; // Asegúrate de importar la interfaz Order

const OrdersPage: React.FC = () => {
    const orders = useAppSelector((state) => state.orders.orders); // Obtener las órdenes del estado
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null); // Controlar qué orden está expandida

    const toggleOrderDetails = (orderId: number) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId)); // Alternar el despliegue
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Órdenes</h1>
            {orders.length === 0 ? (
                <p>No hay órdenes realizadas.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order: Order) => (
                        <li key={order.id} className="border p-4 rounded shadow-lg">
                            {/* Orden ID como encabezado */}
                            <h2
                                className="font-semibold cursor-pointer"
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                Orden ID: {order.id}
                            </h2>

                            {/* Mostrar detalles solo si la orden está expandida */}
                            {expandedOrderId === order.id && (
                                <div className="mt-4">
                                    <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
                                    <h3 className="font-semibold mt-2">Productos:</h3>
                                    <ul className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex space-x-4 items-start">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    className="w-20 h-20 object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-bold">{item.product.title}</h4>
                                                    <p className="text-sm">{item.product.description}</p>
                                                    <p>Cantidad: {item.quantity}</p>
                                                    <p>Precio: ${item.product.price.toFixed(2)}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
