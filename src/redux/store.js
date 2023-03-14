import { configureStore } from '@reduxjs/toolkit';
import filter from './slice/filterSlice';
import pizza from './slice/pizzasSlice';

export const store = configureStore({
    reducer: {
        filter,
        pizza,
      },
    });