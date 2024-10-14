// store/categoriesSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
    categories: string[];
    selectedCategory: string | null; // Añadir el estado para la categoría seleccionada
}

const initialState: CategoriesState = {
    categories: [],
    selectedCategory: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload; // Reducer para seleccionar la categoría
        },
        clearCategory: (state) => {
            state.selectedCategory = null; // Reducer para limpiar la categoría seleccionada
        },
    },
});

export const { setCategories, selectCategory, clearCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
