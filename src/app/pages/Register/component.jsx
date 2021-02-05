/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AuthContext } from 'auth';
import { SET_PAGE } from 'app/actions/types';
import { PAGES } from 'app/const';

const RegistrationPage = ({ pageReducers }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { signUpWithEmailAndPassword } = React.useContext(
    AuthContext,
  );
  const { page } = pageReducers;
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [
    isButtonDisabled,
    setIsButtonDisabled,
  ] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUpWithEmailAndPassword({
      email,
      name,
      username,
      password,
    });
    history.push('/');
  };

  React.useEffect(() => {
    if (
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      name.trim() !== ''
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, name, email, password]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
          required
          type="email"
        />
        <input
          onChange={(event) =>
            setUsername(event.target.value)
          }
          value={username}
          placeholder="Username"
          type="text"
          required
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// return (

//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <form
//           className={classes.form}
//           noValidate
//           onSubmit={(event) => handleSubmit(event)}>
//           <TextField
//             autoComplete="off"
//             autoFocus
//             fullWidth
//             id="name"
//             label="Name"
//             margin="normal"
//             name="name"
//             onChange={(event) =>
//               setName(event.target.value)
//             }
//             required
//             value={name}
//             variant="outlined"
//           />
//           <TextField
//             autoComplete="off"
//             autoFocus
//             fullWidth
//             id="username"
//             label="Username"
//             margin="normal"
//             name="username"
//             onChange={(event) =>
//               setUsername(event.target.value)
//             }
//             required
//             value={username}
//             variant="outlined"
//           />
//           <TextField
//             autoComplete="email"
//             autoFocus
//             fullWidth
//             id="email"
//             label="Email Address"
//             margin="normal"
//             name="email"
//             onChange={(event) =>
//               setEmail(event.target.value)
//             }
//             required
//             value={email}
//             variant="outlined"
//           />
//           <TextField
//             autoComplete="current-password"
//             fullWidth
//             id="password"
//             label="Password"
//             margin="normal"
//             name="password"
//             onChange={(event) =>
//               setPassword(event.target.value)
//             }
//             required
//             type="password"
//             value={password}
//             variant="outlined"
//           />
//           <Button
//             className={classes.submit}
//             color="primary"
//             disabled={isButtonDisabled}
//             fullWidth
//             type="submit"
//             variant="contained">
//             Register
//           </Button>
//           <Grid
//             container
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//             }}>
//             <Grid item>
//               <Link to="/login" variant="body2">
//                 {'Already have an account? Sign In'}
//               </Link>
//             </Grid>
//           </Grid>
//           <Box mt={5}>
//             <Copyright />
//           </Box>
//         </form>
//       </div>
//     </Grid>
//   </Grid>
// );
RegistrationPage.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default RegistrationPage;
