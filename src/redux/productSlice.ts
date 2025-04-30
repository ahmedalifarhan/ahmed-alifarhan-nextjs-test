import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product"; // تأكد إن المسار صحيح حسب مشروعك

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
    // ✅ تعيين بيانات المنتج
    setProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },

    // ✅ تعيين حالة التحميل
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    // ✅ تعيين رسالة الخطأ
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ تحديث الكمية المطلوبة من المنتج
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
  },
});

export const { setProduct, setLoading, setError, setQuantity } =
  productSlice.actions;

export default productSlice.reducer;
