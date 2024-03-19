import { apiSlice } from './apiSlice'; // Import the API slice from another file

// Inject endpoints into the API slice for authentication purposes
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a mutation for user registration
    register: builder.mutation({
      query: (credentials) => ({ // Define the query for registration
        url: '/auth/register', // URL endpoint for registration
        method: 'POST', // HTTP method for the request
        body: { ...credentials }, // Body of the request containing user credentials
      }),
    }),
    // Define a mutation for user login
    login: builder.mutation({
      query: (credentials) => ({ // Define the query for login
        url: '/auth/login', // URL endpoint for login
        method: 'POST', // HTTP method for the request
        body: { ...credentials }, // Body of the request containing user credentials
      }),
    }),
    // Define a mutation for user logout
    sendLogout: builder.mutation({
      query: () => ({ // Define the query for logout
        url: '/auth/logout', // URL endpoint for logout
        method: 'POST', // HTTP method for the request
      }),
    }),
  }),
});

// Extract specific hooks from the authApiSlice for use in components
export const { useRegisterMutation, useLoginMutation, useSendLogoutMutation } = authApiSlice;
