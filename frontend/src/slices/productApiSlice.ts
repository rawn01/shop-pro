import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => ({
        url: PRODUCTS_URL + "/" + id
      })
    })
  })
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;