import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { serverUrl } from "../../utlis/config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}/api/`,
  }),
  endpoints(build) {
    return {
      login: build.mutation({
        query(user) {
          return {
            url: "auth/local",
            method: "post",
            body: user, // identifier
          };
        },
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
