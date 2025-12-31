import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  userId: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; userId: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
