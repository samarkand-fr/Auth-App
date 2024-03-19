import Cookies from "js-cookie";
import { useSendLogoutMutation } from "../redux/app/authApiSlice";
import { useGetUsersQuery } from "../redux/app/UsersapiSlice";
import styles from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery();
  const [sendLogout] = useSendLogoutMutation();
  const formatDate = (dateString) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "Invalid date format";

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${year}/${month}/${day}`;
  };
 
  const handleLogout = async () => {
    try {
      await sendLogout();
      Cookies.remove("accessToken");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading && !isError && <p>Loading...</p>}
      {!isLoading && isError && <p>Error: {error.data.message}</p>}
      {!isLoading && isSuccess && users && users.length > 0 && (
        <table className={styles.table}>
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button type="button" onClick={handleLogout} className={styles.btnOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
