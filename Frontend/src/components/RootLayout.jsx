import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../styles/Nav.module.css'; // Import the CSS module

const RootLayout = () => {
  return (
    <div>
      {/* Navigation links */}
      <nav className={styles.navbar}> {/* Apply navbar styles */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="/auth/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      {/* Outlet for rendering child components */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
