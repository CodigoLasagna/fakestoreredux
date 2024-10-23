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
		<div className={`border border-gray-700 bg-[#2C3A47] p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${isCartVisible ? 'translate-x-full' : 'translate-x-0'} fixed right-0 top-16 w-1/3`}>
		  <h2 className="text-2xl font-bold text-[#ECB22E] mb-4">{selectedProduct.title}</h2>
		  <img
		    src={selectedProduct.image}
		    alt={selectedProduct.title}
		    className="h-48 w-full object-cover rounded-lg mb-4"
		  />
		  <p className="text-[#4D9BE6] font-semibold text-lg mb-2">Precio: ${selectedProduct.price}</p>
		  <p className="text-white mb-4">{selectedProduct.description}</p>
		</div>
    );
};

export default ProductDetailPanel;
