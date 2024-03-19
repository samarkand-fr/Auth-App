import { configureStore } from '@reduxjs/toolkit'; // Import configureStore function from Redux Toolkit
import { apiSlice } from './app/apiSlice'; // Import the API slice from another file
import { setupListeners } from '@reduxjs/toolkit/query'; // Import setupListeners function from Redux Toolkit

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the reducer for the API slice to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add middleware for handling API requests
  devTools: import.meta.env.VITE_NODE_ENV === 'development', // Enable Redux DevTools in development mode
});

// Set up listeners to automatically unsubscribe query event listeners when the store is destroyed
setupListeners(store.dispatch);
