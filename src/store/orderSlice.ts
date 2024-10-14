// store/orderSlice.ts
'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
    id: number; // O cualquier identificador único
    items: { productId: number; quantity: number }[];
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
            state.orders.push(action.payload); // Agrega una nueva orden
        },
    },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;
