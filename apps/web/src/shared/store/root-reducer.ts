import { authReducer } from "@/features/auth/model/slice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  auth: authReducer,
});
