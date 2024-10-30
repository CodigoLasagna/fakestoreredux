'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const products = await response.json();

    // Agregar todos los productos a la base de datos en una sola solicitud
    const dbResponse = await fetch('/api/products/addProducts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(products), // Enviar todos los productos como un array
    });

    // Verificar si la respuesta de la base de datos fue exitosa
    if (!dbResponse.ok) {
        throw new Error('Failed to insert products into the database');
    }

    return products; // Retornar los productos solo si la inserción fue exitosa
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export default productsSlice.reducer;
