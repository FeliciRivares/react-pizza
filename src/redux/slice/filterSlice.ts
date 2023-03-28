import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  propertyName: string,
  sortType: 'rating' | 'title' | 'price',
}

export interface FilterSliceState{
  searchValue: string,
  categoryValue: number,
  currentPage: number,
  sort: Sort
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryValue: 0,
  currentPage: 1,
  sort: {
    propertyName: 'Popularity',
    sortType: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryValue(state, action: PayloadAction<number>) {
      state.categoryValue = action.payload;
    },
    setSortValue(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length){
        state.currentPage = Number(action.payload.currentPage);
        state.categoryValue = Number(action.payload.categoryValue);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryValue = 0;
        state.sort = {
          propertyName: 'Popularity',
          sortType: 'rating',
        }
      }
      
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryValue, setSortValue, setPageCount, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
