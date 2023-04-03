export type Sort = {
    propertyName: string,
    sortType: 'rating' | 'title' | 'price',
  }
  
export interface FilterSliceState{
    searchValue: string,
    categoryValue: number,
    currentPage: number,
    sort: Sort
  }