import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/authApi";
import orderApi from "./api/orderApi";
import productsApi from "./api/productsApi";
import { authSlice } from "./api/reducer/authSlice";
import { notiSlice } from "./api/reducer/notiSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authSlice.reducer,
    noti: notiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      orderApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
