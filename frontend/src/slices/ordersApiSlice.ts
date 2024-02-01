import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: {...order}
      })
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`
      }),
      keepUnusedDataFor: 5
    })
  })
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = ordersApiSlice;