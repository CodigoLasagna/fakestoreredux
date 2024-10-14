'use client';

import ProductGrid from '@/components/ProductGrid';

export default function Home() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Productos</h1>
            <ProductGrid />
        </main>
    );
}
