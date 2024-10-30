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

    // Intenta agregar todos los productos a la base de datos
    const dbResponses = await Promise.all(products.map(product => 
        fetch('/api/products/addProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product), // Enviar cada producto individualmente
        })
    ));

    // Verificar si alguna de las respuestas no fue exitosa
    const allSuccessful = dbResponses.every(dbResponse => dbResponse.ok);
    if (!allSuccessful) {
        throw new Error('Failed to insert one or more products into the database');
    }
    
    return products as Product[];
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
