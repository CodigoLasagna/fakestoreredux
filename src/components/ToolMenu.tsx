'use client';

import Link from 'next/link';

const ToolMenu: React.FC = () => {
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
			</ul>
		</nav>
	);
};

export default ToolMenu;
