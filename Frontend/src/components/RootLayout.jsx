import { Outlet } from 'react-router'; // Import Outlet component from react-router

const RootLayout = () => {
  return <Outlet />; // Render the Outlet component, which renders the child routes
};

export default RootLayout; // Export the RootLayout component
