import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

interface SelectedProductState {
    selectedProduct: Product | null;
}

const initialState: SelectedProductState = {
    selectedProduct: null,
};

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        selectProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },
        clearProduct: (state) => {
            state.selectedProduct = null;
        },
    },
});

export const { selectProduct, clearProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
