import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';  // Importa la interfaz Product

// Modifica el tipo OrderItem para que incluya los detalles del producto
interface OrderItem {
    product: Product;  // Almacena el producto completo
    quantity: number;
}

export interface Order {
    id: number;
    items: OrderItem[];
    total: number;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;
