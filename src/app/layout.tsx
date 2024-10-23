// layout.tsx

'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import 'tailwindcss/tailwind.css';
import ToolMenu from '@/components/ToolMenu';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
		<html lang="en">
		  <body className="bg-[#1B232B] text-white">
		    <Provider store={store}>
		      <ToolMenu /> {/* Menú principal */}
		      <div className="pt-20 px-6">
		        {children}
		      </div>
		    </Provider>
		  </body>
		</html>
    );
}
