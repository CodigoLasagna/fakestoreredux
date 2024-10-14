// components/ProductDetailPanel.tsx
'use client';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { hideCart } from '@/store/cartSlice';

const ProductDetailPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector((state) => state.selectedProduct.selectedProduct);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible); // Obtener visibilidad del carrito

    const handleClick = () => {
        dispatch(hideCart()); // Ocultar el carrito al abrir los detalles
    };

    if (!selectedProduct) {
        return;
    }

    return (
        <div className={`border p-4 ${isCartVisible ? 'hidden' : 'block'} fixed right-0 top-16 w-1/3`}>
            <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="h-32 w-full object-cover mb-4" />
            <p className="text-gray-600">Precio: ${selectedProduct.price}</p>
            <p className="mt-2">{selectedProduct.description}</p>
        </div>
    );
};

export default ProductDetailPanel;
