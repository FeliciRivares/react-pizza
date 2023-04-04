import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import pizza from './pizzas/slice';
import cart from './cart/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    pizza,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
