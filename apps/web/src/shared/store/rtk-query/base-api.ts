import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Card", "Match", "Deck", "User"],
  endpoints: () => ({}),
});
