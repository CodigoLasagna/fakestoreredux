// components/ToolMenu.tsx
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { selectCategory } from '@/store/categoriesSlice';

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
		<nav className="fixed top-0 left-0 right-0 bg-[#1B232B] shadow-md z-10 p-4">
		  <ul className="flex space-x-6">
		    <li>
		      <Link href="/">
		        <button className="bg-[#4D9BE6] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#377bb3] transition duration-200">
		          Inicio
		        </button>
		      </Link>
		    </li>
		    {categories.map((category) => (
		      <li key={category}>
		        <Link href={`/products?category=${category}`}>
		          <button
		            className="bg-[#81DC26] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#6ca31d] transition duration-200"
		            onClick={() => dispatch(selectCategory(category))}
		          >
		            {category.charAt(0).toUpperCase() + category.slice(1)}
		          </button>
		        </Link>
		      </li>
		    ))}
		    <li>
		      <Link href="/">
		        <button className="relative bg-[#4D9BE6] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#377bb3] transition duration-200">
		          Carrito
		          {totalQuantity > 0 && (
		            <span className="absolute -top-2 -right-2 bg-[#F23F42] text-white text-xs rounded-full px-2">
		              {totalQuantity}
		            </span>
		          )}
		        </button>
		      </Link>
		    </li>
		    <li>
		      <Link href="/orders">
		        <button className="bg-[#ECB22E] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#d1a021] transition duration-200">
		          Órdenes
		        </button>
		      </Link>
		    </li>
		  </ul>
		</nav>
    );
};

export default ToolMenu;
