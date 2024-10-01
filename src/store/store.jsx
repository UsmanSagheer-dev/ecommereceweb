import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productslice/productSlice";
export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});
