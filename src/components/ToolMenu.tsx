import Link from 'next/link';
import { useAppSelector } from '@/store/store'; // Asegúrate de importar useAppSelector

const ToolMenu: React.FC = () => {
    const cartItems = useAppSelector((state) => state.cart.items); // Obtener los productos en el carrito
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calcular la cantidad total de productos

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
                <li>
                    <Link href="/about">
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                            Acerca de
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
            </ul>
        </nav>
    );
};

export default ToolMenu;
