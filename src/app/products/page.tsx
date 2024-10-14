// src/app/products/page.tsx
import React from 'react';
import CategorizedProductGrid from '@/components/CategorizedProductGrid';

const ProductsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Productos</h1>
            <CategorizedProductGrid />
        </div>
    );
};

export default ProductsPage;
