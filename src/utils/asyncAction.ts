import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, FetchPizzasArg } from "../redux/pizzas/type";

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