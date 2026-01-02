import { baseApi } from "@/shared/store/rtk-query/base-api";

export type CardDto = {
  id: string;
  name: string;
  mana: number;
};

export const cardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<CardDto[], void>({
      query: () => "/cards",
      providesTags: (result) =>
        result
          ? [
              ...result.map((c) => ({ type: "Card" as const, id: c.id })),
              { type: "Card" as const, id: "LIST" },
            ]
          : [{ type: "Card" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCardsQuery } = cardApi;
