import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data
      })
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;