import { CartItem } from './cartSlice';
import { RootState } from './../store';
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type FetchPizzasArg = {
  sortBy: string,
  category: string,
  search: string,
  currentPage: number,
}

type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number;
    type: string;
    count: number;
  }

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArg>('pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6405e93740597b65de44db55.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}${search}`,
    );
    return data;
  });

  
  interface PizzaSliceState {
    items: Pizza[],
    status: 'loading'| 'success' | 'error', 
  }


  const initialState: PizzaSliceState = {
    items: [],
    status: 'loading', 
  };


  const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
        state.items = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      builder.addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })
    }
  });
  export const selectPizzaData = (state: RootState) => state.pizza;

  export const { setItems } = pizzaSlice.actions;

  export default pizzaSlice.reducer;