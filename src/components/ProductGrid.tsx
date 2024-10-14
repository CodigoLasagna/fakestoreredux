// ProductGrid.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';
import { selectProduct } from '@/store/selectedProductSlice';
import { addToCart, hideCart } from '@/store/cartSlice';

const ProductGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (product: any) => {
        dispatch(selectProduct(product));
        dispatch(hideCart()); // Ocultar el carrito al seleccionar un producto
    };

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product)); // Agregar el producto al carrito
        dispatch(selectProduct(null)); // Ocultar el panel de detalles
        // No ocultes el carrito aquí; manejar esto en el Cart directamente
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border p-4 rounded cursor-pointer"
                    onClick={() => handleProductClick(product)}
                >
                    <img src={product.image} alt={product.title} className="h-32 w-full object-cover" />
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que se active el clic del producto
                            handleAddToCart(product);
                        }} 
                        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
