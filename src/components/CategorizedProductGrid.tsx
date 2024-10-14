// components/CategorizedProductGrid.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';
import { selectProduct } from '@/store/selectedProductSlice';
import { addToCart, hideCart } from '@/store/cartSlice';
import { selectCategory } from '@/store/categoriesSlice'; // Importar la acción

const CategorizedProductGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);
    const selectedCategory = useAppSelector((state) => state.categories.selectedCategory); // Obtener la categoría seleccionada

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (product: any) => {
        dispatch(selectProduct(product));
        dispatch(hideCart());
    };

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
        dispatch(selectProduct(null));
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filtrar productos por categoría seleccionada
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products; // Si no hay categoría seleccionada, mostrar todos los productos

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="border p-4 rounded cursor-pointer flex flex-col h-full"
                    onClick={() => handleProductClick(product)}
                >
                    <img src={product.image} alt={product.title} className="h-32 w-full object-cover mb-4" />
                    <h2 className="text-lg font-semibold flex-grow">{product.title}</h2>
                    <p className="text-gray-600">${product.price}</p>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
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

export default CategorizedProductGrid;
