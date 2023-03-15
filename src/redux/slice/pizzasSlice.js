import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const { sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6405e93740597b65de44db55.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}${search}`,
    );
  
    return data;
  });


  const initialState = {
    items: [],
    status: 'loading', 
  };


  const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
      setItems(state, action) {
        state.items = action.payload;
      },
    },
    extraReducers: {
      [fetchPizzas.pending]: (state) => {
        state.status = 'loading';
        state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        // console.log(action, 'fulfilled');
        state.items = action.payload;
        state.status = 'success';
      },
      [fetchPizzas.rejected]: (state, action) => {
        // console.log(action, 'rejected');
        state.status = 'error';
        state.items = [];
      },
    },
  });
  export const selectPizzaData = (state) => state.pizza;

  export const { setItems } = pizzaSlice.actions;

  export default pizzaSlice.reducer;