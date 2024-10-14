// components/ToolMenu.tsx
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { selectCategory } from '@/store/categoriesSlice'; // Importar la acción

const ToolMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const categories = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow z-10 p-4">
            <ul className="flex space-x-6">
                <li>
                    <Link href="/">
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            Inicio
                        </button>
                    </Link>
                </li>
                {/* ... otros enlaces ... */}
                <li>
                    <Link href="/products">
                        <button 
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                            onClick={() => dispatch(selectCategory(null))} // Limpiar categoría seleccionada al ir a la página de productos
                        >
                            Todos los productos
                        </button>
                    </Link>
                </li>
                {categories.map((category) => (
                    <li key={category}>
                        <Link href={`/products?category=${category}`}>
                            <button 
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                onClick={() => dispatch(selectCategory(category))} // Establecer la categoría al hacer clic
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="/">
                        <button className="relative bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            Carrito
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>
                    </Link>
                </li>
                <li>
                    <Link href="/orders">
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            Órdenes
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default ToolMenu;
