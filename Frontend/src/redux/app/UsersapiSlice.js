import { apiSlice } from './apiSlice'; // Import the API slice from another file

// Inject endpoints into the API slice for users functionality
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query to fetch users
    getUsers: builder.query({
      query: () => ({
        url: '/users', // URL endpoint for fetching users
      }),
    }),
  }),
});

// Extract specific hook from the usersApiSlice for fetching users in components
export const { useGetUsersQuery } = usersApiSlice;
