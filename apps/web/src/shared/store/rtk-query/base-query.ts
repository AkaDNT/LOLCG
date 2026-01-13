import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/shared/store";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");

    return headers;
  },
});
