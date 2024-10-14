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
                existingItem.quantity += 1; // Incrementar cantidad si ya existe
            } else {
                state.items.push({ product: action.payload, quantity: 1 }); // Agregar nuevo producto
            }
            state.isCartVisible = true; // Mostrar el carrito al agregar un producto
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            // Eliminar producto del carrito
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        toggleCartVisibility: (state) => {
            state.isCartVisible = !state.isCartVisible; // Alternar visibilidad
        },
        hideCart: (state) => {
            state.isCartVisible = false; // Ocultar el carrito
        },
        setItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.product.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity; // Establecer la cantidad del producto
            }
        },
    },
});

export const { addToCart, removeFromCart, toggleCartVisibility, hideCart, setItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
