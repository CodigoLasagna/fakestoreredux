import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productsReducer from '@/store/productsSlice';
import selectedProductReducer from '@/store/selectedProductSlice'
import cartReducer from '@/store/cartSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
		selectedProduct: selectedProductReducer,
		cart: cartReducer,
    },
});

// Tipos para el state y el dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// hooks personalizados
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
