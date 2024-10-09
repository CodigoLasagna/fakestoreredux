'use client'; // Necesario porque Redux usa funcionalidades del cliente

import { Provider } from 'react-redux';
import store from '@/store/store';
import 'tailwindcss/tailwind.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					{children}
				</Provider>
			</body>
		</html>
	);
}
