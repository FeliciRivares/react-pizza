import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryValue(state, action) {
      state.categoryValue = action.payload;
    },
    setSortValue(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
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
export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryValue, setSortValue, setPageCount, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
