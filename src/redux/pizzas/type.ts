export type FetchPizzasArg = {
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number;
  type: string;
  count: number;
};
