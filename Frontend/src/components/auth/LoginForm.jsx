import { useState } from 'react'; 
import styles from '../../styles/Form.module.css'; // Import styles for the form
import { useLoginMutation } from '../../redux/app/authApiSlice'; // Import useLoginMutation hook for login mutation
import Cookies from 'js-cookie'; // Import Cookies for managing cookies
import { useNavigate } from 'react-router'; // Import useNavigate hook for navigation

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Initialize state for user inputs (email and password)
  const [userInputs, setUserInputs] = useState({ email: '', password: '' });

  // Use useLoginMutation hook to get the login mutation function, loading status, and error status
  const [login, { isError, isLoading, error }] = useLoginMutation();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Call login mutation with user email and password
      const { data } = await login({
        email: userInputs.email,
        password: userInputs.password,
      });
      const accessToken = data.accessToken; // Extract accessToken from response data
      if (accessToken) {
        Cookies.set('accessToken', accessToken); // Set accessToken cookie
        setUserInputs({ email: '', password: '' }); // Clear user inputs
        navigate('/dashboard'); // Navigate to the dashboard page
      }
    } catch (error) {
      console.log(error); // Log error if login fails
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}> {/* Login form */}
        <fieldset>
          <label htmlFor='email'>Email</label> {/* Email input label */}
          <input
            id='email'
            type='email'
            name='email'
            required
            value={userInputs.email}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label> {/* Password input label */}
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
            value={userInputs.password}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
        </fieldset>
        <button disabled={isLoading} type='submit'> {/* Submit button */}
          {isLoading ? 'Submitting...' : 'Signin'} {/* Button text based on loading status */}
        </button>
      </form>
      {/* Display error message if isError is true */}
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
};

export default LoginForm; 
