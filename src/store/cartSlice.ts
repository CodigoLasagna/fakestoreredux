// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
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
            state.isCartVisible = true; // Mostrar el carrito al agregar un producto
        },
        toggleCartVisibility: (state) => {
            state.isCartVisible = !state.isCartVisible; // Alternar visibilidad
        },
        hideCart: (state) => {
            state.isCartVisible = false; // Ocultar el carrito
        },
    },
});

export const { addToCart, toggleCartVisibility, hideCart } = cartSlice.actions;
export default cartSlice.reducer;
