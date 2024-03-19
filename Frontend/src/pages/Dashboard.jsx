import Cookies from "js-cookie";
import { useSendLogoutMutation } from "../redux/app/authApiSlice";
import { useGetUsersQuery } from "../redux/app/UsersapiSlice";
import styles from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();// Initialize useNavigate hook
  // Get data, loading status, error status, and success status from useGetUsersQuery hook
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery();
   // Use useSendLogoutMutation hook to get the logout mutation function
  const [sendLogout] = useSendLogoutMutation();
    // Function to format date string
  const formatDate = (dateString) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);// Match date string pattern
    if (!match) return "Invalid date format";// Return if date format is invalid

    const year = match[1];// Extract year from match
    const month = match[2];// Extract month from match
    const day = match[3];// Extract day from match

    return `${year}/${month}/${day}`;// Return formatted date string
  };
  // Function to handle logout
  const handleLogout = async () => {
    try {
      await sendLogout();// Call sendLogout mutation to logout
      Cookies.remove("accessToken");// Remove accessToken cookie
      navigate("/auth/login");// Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error); // Log error if logout fails
    }
  };
  
  return (
    <div>
      {/* Dashboard heading */}
      <h1>Dashboard</h1>
      {/* Display loading message if loading */}
      {isLoading && !isError && <p>Loading...</p>}
      {/* Display error message if error */}
      {!isLoading && isError && <p>Error: {error.data.message}</p>}
      {/* Display users table if successful */}
      {!isLoading && isSuccess && users && users.length > 0 && (
        <table className={styles.table}>{/* Table for displaying users */}
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through users to display each user */}
            {users.map((user) => (
              <tr key={user._id}>{/* Table row for each user */}
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>{/* Display formatted creation date */}
                <td>{formatDate(user.updatedAt)}</td>{/* Display formatted update date */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Logout button */}
      <div>
        <button type="button" onClick={handleLogout} className={styles.btnOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
