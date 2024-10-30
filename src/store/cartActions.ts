// store/cartActions.ts
import { AppDispatch } from './store';
import { addToCart as addToCartAction } from './cartSlice';
import { Product } from './cartSlice'; // Asegúrate de importar Product desde cartSlice

export const addToCart = (product: Product) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/cart/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar al carrito');
            }

            // Llamar a la acción del slice solo después de que la API responde exitosamente
            dispatch(addToCartAction(product));
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            // Manejar el error como desees
        }
    };
};
