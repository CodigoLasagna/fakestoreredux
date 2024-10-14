'use client';

import ProductGrid from '@/components/ProductGrid';
import ProductDetailPanel from '@/components/ProductDetailPanel';
import Cart from '@/components/Cart';

export default function Home() {
    return (
        <main className="container mx-auto p-4 flex">
            <div className="flex-1">
                <h1 className="text-3xl font-bold">Productos</h1>
                <ProductGrid />
            </div>
            <div className="w-1/3 ml-4">
                <ProductDetailPanel />
				<Cart />
            </div>
        </main>
    );
}
