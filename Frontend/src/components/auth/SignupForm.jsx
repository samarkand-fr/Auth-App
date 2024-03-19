import { useState } from 'react'; 
import styles from '../../styles/Form.module.css'; // Import styles for the form
import { useRegisterMutation } from '../../redux/app/authApiSlice'; // Import register mutation from authApiSlice
import Cookies from 'js-cookie'; // Import Cookies for managing cookies
import { useNavigate } from 'react-router'; // Import useNavigate hook for navigation

const SignupForm = () => {
  const navigate = useNavigate(); // Get navigate function for navigation

  // State variables for user inputs and form status
  const [userInputs, setUserInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // Mutation function for user registration and status variables
  const [register, { isError, isLoading, error }] = useRegisterMutation();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Call the register mutation with user inputs
      const { data } = await register({
        first_name: userInputs.first_name,
        last_name: userInputs.last_name,
        email: userInputs.email,
        password: userInputs.password,
      });

      // If registration is successful, set access token in cookies and redirect to dashboard
      const accessToken = data.accessToken;
      if (accessToken) {
        Cookies.set('accessToken', accessToken); // Set access token in cookies
        setUserInputs({ // Clear user inputs
          email: '',
          first_name: '',
          last_name: '',
          password: '',
        });
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during registration
    }
  };

  // Render the signup form
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input fields for first name, last name, email, and password */}
        <fieldset>
          <label htmlFor='first_name'>First Name</label>
          <input
            id='first_name'
            type='text'
            name='first_name'
            required
            minLength={5}
            value={userInputs.first_name}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, first_name: e.target.value };
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='last_name'>Last Name</label>
          <input
            id='last_name'
            type='text'
            name='last_name'
            required
            minLength={5}
            value={userInputs.last_name}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, last_name: e.target.value };
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='email'>Email</label>
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
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            minLength={6}
            required
            value={userInputs.password}
            onChange={(e) =>
              setUserInputs((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
        </fieldset>
        {/* Submit button */}
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Create Account'}
        </button>
      </form>
      {/* Error message for registration errors */}
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
};

export default SignupForm; 
