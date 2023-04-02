import { configureStore } from '@reduxjs/toolkit';
import filter from './slice/filterSlice';
import pizza from './slice/pizzasSlice';
import cart from './slice/cart/slice';
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filter,
        pizza,
        cart,
      },
    });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch