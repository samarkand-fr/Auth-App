import { useState } from 'react'; 
import styles from '../../styles/Form.module.css'; // Importing styles for the form
import { useLoginMutation } from '../../redux/app/authApiSlice'; // Importing useLoginMutation hook for login mutation
import Cookies from 'js-cookie'; // Importing Cookies for managing cookies
import { useNavigate } from 'react-router'; // Importing useNavigate hook for navigation

const LoginForm = () => {
  const navigate = useNavigate(); // Initializing useNavigate hook
  const [userInputs, setUserInputs] = useState({ email: '', password: '' }); // Initializing state for user inputs (email and password)
  const [login, { isError, isLoading, error }] = useLoginMutation(); // Using useLoginMutation hook to get the login mutation function, loading status, and error status

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    try {
      // Calling login mutation with user email and password
      const { data } = await login({
        email: userInputs.email,
        password: userInputs.password,
      });
      const accessToken = data.accessToken; // Extracting accessToken from response data
      if (accessToken) {
        Cookies.set('accessToken', accessToken); // Setting accessToken cookie
        setUserInputs({ email: '', password: '' }); // Clearing user inputs
        navigate('/dashboard'); // Navigating to the dashboard page
      }
    } catch (error) {
      console.log(error); // Logging error if login fails
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
      {isError && error && <p className={styles.error}>{error.data.message}</p>} {/* Display error message if isError is true */}
      {/* Message for users without an account */}
      <p>Do not have an account? <a href="/auth/signup">Sign up</a></p>
    </>
  );
};

export default LoginForm;
