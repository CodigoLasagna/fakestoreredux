// components/ProductGrid.tsx
'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';
import { selectProduct } from '@/store/selectedProductSlice';
import { addToCart, hideCart, toggleCartVisibility } from '@/store/cartSlice';
import { toast } from 'react-toastify';

const ProductGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const isAuthenticated = () => {
        // Implementa la lógica para verificar si el usuario está autenticado
        // Puedes verificar si el token está en cookies, Redux o localStorage
        const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
        return token !== undefined; // Devuelve true si el usuario está autenticado
    };

    const handleProductClick = (product: any) => {
        dispatch(selectProduct(product));
        dispatch(hideCart()); // Ocultar el carrito al seleccionar un producto
    };

    const handleAddToCart = async (product: any) => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        try {
            // Enviar solicitud a la API para agregar el producto al carrito
            const response = await fetch('/api/cart/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: product.id, // Cambiado a itemId
                    quantity: 1, // Puedes modificar la cantidad si es necesario
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al agregar el producto al carrito');
            }

            // Agregar el producto al carrito en el estado de Redux
            dispatch(addToCart(product));

            // Mostrar notificación de éxito con la imagen del producto
            toast.success(
                <div className="flex items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 rounded mr-2"
                    />
                    <span>{`${product.title} ha sido agregado al carrito!`}</span>
                </div>,
                {
                    autoClose: 1200,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            dispatch(toggleCartVisibility()); // Mostrar el carrito
            dispatch(selectProduct(null)); // Ocultar el panel de detalles
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            toast.error('Hubo un problema al agregar el producto al carrito.');
        }
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-[#1B232B]">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border border-gray-700 bg-[#2C3A47] p-4 rounded-lg cursor-pointer flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    onClick={() => handleProductClick(product)}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-40 w-full object-cover mb-4 rounded-lg"
                    />
                    <h2 className="text-lg font-semibold text-white flex-grow mb-2">
                        {product.title}
                    </h2>
                    <p className="text-[#4D9BE6] font-medium mb-4">${product.price}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que se active el clic del producto
                            handleAddToCart(product);
                        }}
                        className="mt-auto bg-[#81DC26] text-black py-2 px-4 rounded-md font-semibold hover:bg-[#ECB22E] transition-colors duration-300 ease-in-out"
                    >
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
