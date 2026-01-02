import { authReducer } from "@/features/auth/model/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./rtk-query/base-api";

export const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
