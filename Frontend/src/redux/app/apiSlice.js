import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    try {
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
      const { accessToken } = refreshResult.data;
      Cookies.set('accessToken', accessToken);
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      if (error?.error?.status === 403) {
        error.error.data.message = 'Your login has expired.';
      }
      return error;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
