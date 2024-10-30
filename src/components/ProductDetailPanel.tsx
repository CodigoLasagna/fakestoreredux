// components/ProductDetailPanel.tsx
'use client';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { hideCart, addToCart } from '@/store/cartSlice'; // Asegúrate de importar addToCart
import { toast } from 'react-toastify';

const ProductDetailPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector((state) => state.selectedProduct.selectedProduct);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible); // Obtener visibilidad del carrito

    const handleClick = () => {
        dispatch(hideCart()); // Ocultar el carrito al abrir los detalles
    };

    const isAuthenticated = () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
        return token !== undefined; // Devuelve true si el usuario está autenticado
    };

    const handleAddToCart = async () => {
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
                    itemId: selectedProduct.id, // Cambiado a itemId
                    quantity: 1, // Puedes modificar la cantidad si es necesario
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al agregar el producto al carrito');
            }

            // Agregar el producto al carrito en el estado de Redux
            dispatch(addToCart(selectedProduct));

            // Mostrar notificación de éxito con la imagen del producto
            toast.success(
                <div className="flex items-center">
                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="w-24 h-24 rounded mr-2"
                    />
                    <span>{`${selectedProduct.title} ha sido agregado al carrito!`}</span>
                </div>,
                {
                    autoClose: 1200,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            dispatch(hideCart()); // Opcional: Ocultar el carrito después de agregar
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            toast.error('Hubo un problema al agregar el producto al carrito.');
        }
    };

    if (!selectedProduct) {
        return null; // O manejar el estado cuando no hay un producto seleccionado
    }

    return (
        <div className={`border border-gray-700 bg-[#2C3A47] p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${isCartVisible ? 'translate-x-full' : 'translate-x-0'} fixed right-0 top-16 w-1/3`}>
            <h2 className="text-2xl font-bold text-[#ECB22E] mb-4">{selectedProduct.title}</h2>
            <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <p className="text-[#4D9BE6] font-semibold text-lg mb-2">Precio: ${selectedProduct.price}</p>
            <p className="text-white mb-4">{selectedProduct.description}</p>
            <button
                onClick={handleAddToCart}
                className="mt-auto bg-[#81DC26] text-black py-2 px-4 rounded-md font-semibold hover:bg-[#ECB22E] transition-colors duration-300 ease-in-out"
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductDetailPanel;
