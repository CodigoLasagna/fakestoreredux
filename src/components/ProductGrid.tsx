'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';

const ProductGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                    <img src={product.image} alt={product.title} className="h-32 w-full object-cover" />
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
