// layout.tsx

'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import 'tailwindcss/tailwind.css';
import ToolMenu from '@/components/ToolMenu'; // Importa el menú de herramientas

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <ToolMenu /> {/* Incluye el menú aquí */}
                    <div className="pt-16"> {/* Padding para el menú */}
                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    );
}
