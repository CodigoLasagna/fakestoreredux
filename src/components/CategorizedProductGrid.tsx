// components/CategorizedProductGrid.tsx
'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProducts } from '@/store/productsSlice';
import { selectProduct } from '@/store/selectedProductSlice';
import { addToCart, hideCart, toggleCartVisibility } from '@/store/cartSlice';
import { toast } from 'react-toastify'; // Importar toast

const CategorizedProductGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);
    const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (product: any) => {
        dispatch(selectProduct(product));
        dispatch(hideCart());
    };

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));

        // Mostrar notificación de éxito con la imagen del producto
        toast.success(
            <div className="flex items-center">
                <img
                    src={product.image} // URL de la imagen del producto
                    alt={product.title}
                    className="w-24 h-24 rounded mr-2" // Estilo de la imagen
                />
                <span>{`${product.title} ha sido agregado al carrito!`}</span>
            </div>,
            {
                autoClose: 1200, // Tiempo de cierre automático
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
        );

        dispatch(toggleCartVisibility()); // Mostrar el carrito
        dispatch(selectProduct(null)); // Ocultar el panel de detalles
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-[#1B232B]">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="border border-gray-700 bg-[#2C3A47] p-4 rounded-lg cursor-pointer flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleProductClick(product)}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-40 w-full object-cover mb-4 rounded-lg"
                    />
                    <h2 className="text-lg font-semibold text-white flex-grow mb-2">
                        {product.title}
                    </h2>
                    <p className="text-[#4D9BE6] font-medium mb-4">${product.price}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que se active el clic del producto
                            handleAddToCart(product);
                        }}
                        className="mt-auto bg-[#81DC26] text-black py-2 px-4 rounded-md font-semibold hover:bg-[#ECB22E] transition-colors duration-300 ease-in-out"
                    >
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategorizedProductGrid;
