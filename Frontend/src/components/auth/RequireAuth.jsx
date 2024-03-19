/* eslint-disable react/prop-types */
import Cookies from 'js-cookie';
import { Navigate } from 'react-router';

const RequireAuth = ({ children }) => {
  const accessToken = Cookies.get('accessToken');

  return accessToken ? children : <Navigate to='/auth/login' replace />;
};

export default RequireAuth;