import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasArg, Pizza } from './type';

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArg>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6405e93740597b65de44db55.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}${search}`,
    );
    return data;
  },
);

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
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
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
