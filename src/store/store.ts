import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer from '@/store/counterSlice';
import productsReducer from '@/store/productsSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
    },
});

// Tipos para el state y el dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// hooks personalizados
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
