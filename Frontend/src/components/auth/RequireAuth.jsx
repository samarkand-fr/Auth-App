/* eslint-disable react/prop-types */ // Disable eslint rule for prop-types validation

import Cookies from 'js-cookie'; // Import Cookies for managing cookies
import { Navigate } from 'react-router'; // Import Navigate component for navigation

const RequireAuth = ({ children }) => { // RequireAuth component takes children as props
  const accessToken = Cookies.get('accessToken'); // Get access token from cookies

  // Render children if access token is present, otherwise redirect to login page
  return accessToken ? children : <Navigate to='/auth/login' replace />;
};

export default RequireAuth; // Export RequireAuth component
