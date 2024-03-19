import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Import necessary functions from Redux Toolkit
import Cookies from 'js-cookie'; // Import Cookies for handling access tokens

// Define a base query for fetching data from the API
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL, // Base URL of the API
  credentials: 'include', // Include credentials in the request
  prepareHeaders: (headers) => { // Prepare headers before making the request
    const token = Cookies.get('accessToken'); // Get the access token from cookies
    if (token) { // If access token exists
      headers.set('authorization', `Bearer ${token}`); // Set authorization header with the token
    }
    return headers; // Return modified headers
  },
});

// Define a base query function with re-authentication logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions); // Perform the base query
  
  // If the result contains a 403 error (forbidden)
  if (result?.error?.status === 403) {
    try {
      // Attempt to refresh the access token
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
      const { accessToken } = refreshResult.data; // Get the new access token from the refresh result
      Cookies.set('accessToken', accessToken); // Update the access token in cookies
      result = await baseQuery(args, api, extraOptions); // Retry the base query with the new access token
    } catch (error) {
      // If refresh fails or results in a 403 error, handle the error
      if (error?.error?.status === 403) {
        error.error.data.message = 'Your login has expired.'; // Set a custom error message
      }
      return error; // Return the error
    }
  }
  return result; // Return the query result
};

// Create an API slice using createApi function
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth, // Use the baseQueryWithReauth function for baseQuery
  endpoints: () => ({}), // Define API endpoints (empty for now)
});
