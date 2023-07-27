import {  configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/CartSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["items"],
};

const persistedReducer = persistReducer(persistConfig, cartReducer);



const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
