// components/ToolMenu.tsx
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { selectCategory } from '@/store/categoriesSlice';
import { toggleCartVisibility } from '@/store/cartSlice'; // Importa la acción

const ToolMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isCartVisible = useAppSelector((state) => state.cart.isCartVisible); // Selecciona la visibilidad del carrito

    const categories = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ];

    const handleCartToggle = () => {
        dispatch(toggleCartVisibility()); // Alterna la visibilidad del carrito
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-[#1B232B] shadow-lg z-10 p-4 transition-all duration-300 ease-in-out">
            <ul className="flex items-center space-x-8">
                <li>
                    <Link href="/" passHref>
                        <button className="bg-[#4D9BE6] text-black font-semibold py-2 px-5 rounded-full shadow-md hover:bg-[#377bb3] transition duration-200 ease-in-out transform hover:scale-105">
                            Inicio
                        </button>
                    </Link>
                </li>
                {categories.map((category) => (
                    <li key={category}>
                        <Link href={`/products?category=${category}`} passHref>
                            <button
                                className="bg-[#81DC26] text-black font-semibold py-2 px-5 rounded-full shadow-md hover:bg-[#6ca31d] transition duration-200 ease-in-out transform hover:scale-105"
                                onClick={() => dispatch(selectCategory(category))}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        </Link>
                    </li>
                ))}
                <li>
                    <button 
                        onClick={handleCartToggle} // Cambia a un botón que alterna el carrito
                        className="relative bg-[#4D9BE6] text-black font-semibold py-2 px-5 rounded-full shadow-md hover:bg-[#377bb3] transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Carrito
                        {totalQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#F23F42] text-white text-xs rounded-full px-2">
                                {totalQuantity}
                            </span>
                        )}
                    </button>
                </li>
                <li>
                    <Link href="/orders" passHref>
                        <button className="bg-[#ECB22E] text-black font-semibold py-2 px-5 rounded-full shadow-md hover:bg-[#d1a021] transition duration-200 ease-in-out transform hover:scale-105">
                            Órdenes
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default ToolMenu;
