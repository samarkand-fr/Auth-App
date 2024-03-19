import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import Cookies from 'js-cookie';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  // Check if there is an access token stored in cookies
  const accessToken = Cookies.get('accessToken');

  // Create a browser router
  const router = createBrowserRouter(
    // Create routes from React elements
    createRoutesFromElements(
      // Root route with a layout
      <Route path='/' element={<RootLayout />}>
        {/* Landing page route */}
        <Route index element={<h1>Authentication App</h1>} />
        {/* Authentication routes */}
        <Route path='auth'>
          {/* Login route, redirects to dashboard if user is logged in */}
          <Route
            path='login'
            element={
              accessToken ? <Navigate to='/dashboard' replace /> : <Login />
            }
          />
          {/* Signup route, redirects to dashboard if user is logged in */}
          <Route
            path='signup'
            element={
              accessToken ? <Navigate to='/dashboard' replace /> : <Signup />
            }
          />
        </Route>
        {/* Dashboard route, protected by authentication */}
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Route>
    )
  );

  // Render the router provider with the created router
  return <RouterProvider router={router} />;
}

export default App;
