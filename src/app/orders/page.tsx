// orders/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { setOrders } from '@/store/orderSlice'; // Asegúrate de importar la acción para establecer las órdenes
import { Order } from '@/store/orderSlice'; // Asegúrate de importar la interfaz Order

const OrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders.orders); // Obtener las órdenes del estado
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null); // Controlar qué orden está expandida
    const [loading, setLoading] = useState<boolean>(true); // Controlar el estado de carga

    const toggleOrderDetails = (orderId: number) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId)); // Alternar el despliegue
    };

    useEffect(() => {
		const fetchOrders = async () => {
		    try {
		        const response = await fetch('/api/orders/getOrders', {
		            method: 'GET',
		            credentials: 'include', // Esto asegura que las cookies se envíen con la solicitud
		        });
		
		        if (response.ok) {
		            const data = await response.json();
		            dispatch(setOrders(data));
		        } else {
		            console.error('Error al obtener órdenes');
		        }
		    } catch (error) {
		        console.error('Error de red:', error);
		    } finally {
		        setLoading(false);
		    }
		};

        fetchOrders();
    }, [dispatch]);

    if (loading) {
        return <p className="text-white">Cargando órdenes...</p>; // Mensaje de carga
    }

return (
    <div className="p-4 bg-[#1B232B]">
        <h1 className="text-2xl font-bold text-white mb-4">Órdenes</h1>
        {orders.length === 0 ? (
            <p className="text-white">No hay órdenes realizadas.</p>
        ) : (
            <ul className="space-y-4">
                {orders.map((order: Order) => (
                    <li
                        key={order.id}
                        className="border border-gray-700 bg-[#2C3A47] p-4 rounded-lg shadow-md 
                            hover:shadow-lg transition-shadow duration-300 ease-in-out 
                            transform transition-transform duration-300"
                    >
                        <h2
                            className="font-semibold text-white cursor-pointer transition-colors duration-300 hover:text-[#4D9BE6]"
                            onClick={() => toggleOrderDetails(order.id)}
                        >
                            Orden : {order.name}
                        </h2>

                        <div
                            className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out 
                                ${expandedOrderId === order.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="font-bold text-[#4D9BE6]">Total: ${order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">Fecha: {new Date(order.date).toLocaleString()}</p>
                            <h3 className="font-semibold mt-2 text-white">Productos:</h3>
                            <ul className="space-y-2">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-start transition-transform duration-200 transform ">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-20 h-20 object-cover mr-4"
                                        />
                                        <div>
                                            <h4 className="font-bold text-white">{item.product.title}</h4>
                                            <p className="text-sm text-gray-400">{item.product.description}</p>
                                            <p className="text-white">Cantidad: {item.quantity}</p>
                                            <p className="text-[#4D9BE6]">Precio: ${item.product.price.toFixed(2)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <h3 className="font-semibold mt-4 text-white">Información de Envío:</h3>
                            <p className="text-white">Nombre: {order.name}</p>
                            <p className="text-white">Dirección: {order.address}</p>
                            <p className="text-white">Método de Pago: {order.paymentMethod}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
};

export default OrdersPage;
