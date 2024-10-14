import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';  // Importa la interfaz Product

interface OrderItem {
    product: Product;
    quantity: number;
}

interface ShippingInfo {
    name: string;
    address: string;
    paymentMethod: string;
}

export interface Order {
    id: number;
    items: OrderItem[];
    total: number;
    shipping: ShippingInfo;  // Agregar detalles de envío
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
