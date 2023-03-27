import { configureStore } from '@reduxjs/toolkit';
import filter from './slice/filterSlice';
import pizza from './slice/pizzasSlice';
import cart from './slice/cartSlice';

export const store = configureStore({
    reducer: {
        filter,
        pizza,
        cart,
      },
    });

export type RootState = ReturnType<typeof store.getState>;