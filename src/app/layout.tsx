// layout.tsx

'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';
import 'tailwindcss/tailwind.css';
import ToolMenu from '@/components/ToolMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPageRef = useRef<HTMLDivElement>(null);
  const lastPageRef = useRef<HTMLCollection | null>(null);
  const exitAnimationDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentPageRef.current) return;

    // Verificamos si lastPageRef tiene elementos antes de usarlo
    if (!lastPageRef.current) {
      lastPageRef.current = currentPageRef.current.children;
    } else if (lastPageRef.current.length > 0) {
      exitAnimationDivRef.current?.appendChild(
        lastPageRef.current[0].cloneNode(true)
      );
      lastPageRef.current = currentPageRef.current.children;
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className="bg-[#1B232B] text-white">
        <Provider store={store}>
          <ToolMenu /> {/* Menú principal */}

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname + "exit-animation"}
              style={{
                position: "absolute",
              }}
              initial={{ x: 0 }}
              animate={{
                x: "-100%",
                opacity: 0,
              }}
              transition={{
                type: "linear",
                duration: 0.2,
              }}
            >
              <div ref={exitAnimationDivRef} />
            </motion.div>

            <motion.div
              key={pathname}
              ref={currentPageRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "+100%", opacity: 0 }}
              transition={{ type: "linear", duration: 0.2 }}
              className="pt-20 px-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Provider>
      </body>
    </html>
  );
}
