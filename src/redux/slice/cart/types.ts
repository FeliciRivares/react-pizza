export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number;
  type: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
