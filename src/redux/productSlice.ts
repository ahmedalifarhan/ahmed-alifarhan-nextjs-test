import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product"; // Adjust the import path if needed

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  quantity: number;
}

const initialState: ProductState = {
  product: null,
  loading: true,
  error: null,
  quantity: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
});

export const { setProduct, setLoading, setError, setQuantity } =
  productSlice.actions;

export default productSlice.reducer;
