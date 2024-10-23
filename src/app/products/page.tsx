'use client';
// src/app/products/page.tsx
import React from 'react';
import CategorizedProductGrid from '@/components/CategorizedProductGrid';
import ProductDetailPanel from '@/components/ProductDetailPanel';
import Cart from '@/components/Cart';

const ProductsPage: React.FC = () => {
    return (
        <main className="container mx-auto p-4 flex">
            <div className="flex-1">
            	<h1 className="text-2xl font-semibold mb-4">Productos</h1>
            	<CategorizedProductGrid />
            </div>
            <div className="w-1/3 ml-4">
                <ProductDetailPanel />
				<Cart />
            </div>
        </main>
    );
};

export default ProductsPage;
