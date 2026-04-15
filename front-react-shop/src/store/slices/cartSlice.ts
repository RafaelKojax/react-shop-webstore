import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Products, CartState } from '../../types';

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Products>) => {
            const itemExistente = state.items.find(
                (item) => item.documentId === action.payload.documentId
            );

           if (itemExistente) {
                itemExistente.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
          },  
        },
    });

    export const { addToCart } = cartSlice.actions;

    export default cartSlice.reducer;


