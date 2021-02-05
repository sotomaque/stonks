/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'auth';

const LoginPage = ({ pageReducers }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { page } = pageReducers;
  const { loginWithEmailAndPassword } = React.useContext(
    AuthContext,
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [
    isButtonDisabled,
    setIsButtonDisabled,
  ] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleError = (error) => {
    if (error?.message?.includes('users_username_key')) {
      setError('Username already taken');
    } else if (error?.code?.includes('auth')) {
      setError(error?.message);
    } else {
      setError(`Unknown Error, ${error}`);
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      setError('');
      await loginWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err) {
      handleError(err);
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (email.trim() !== '' && password.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
          required
          type="email"
        />
        <input
          onChange={(event) =>
            setPassword(event.target.value)
          }
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default LoginPage;
