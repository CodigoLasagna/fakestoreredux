// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isCartVisible: boolean; // Nueva propiedad
}

const initialState: CartState = {
    items: [],
    isCartVisible: false, // Inicialmente oculto
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
            state.isCartVisible = true;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        toggleCartVisibility: (state) => {
            state.isCartVisible = !state.isCartVisible;
        },
        hideCart: (state) => {
            state.isCartVisible = false;
        },
        setItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.product.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = []; // Limpiar los productos
            state.isCartVisible = false; // Opcional: ocultar el carrito
        },
    },
});

export const { addToCart, removeFromCart, toggleCartVisibility, hideCart, setItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
