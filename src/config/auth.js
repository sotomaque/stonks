// @ts-nocheck
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../gql/mutations';

const provider = new firebase.auth.GoogleAuthProvider();

// Connect to Firebase
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// Create React Context
export const AuthContext = React.createContext({});

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({
    status: 'loading',
  });
  const [createUser] = useMutation(CREATE_USER);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims[
            'https://hasura.io/jwt/claims'
          ];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  async function loginWithGoogle() {
    const data = await firebase
      .auth()
      .signInWithPopup(provider);
    if (data.additionalUserInfo.isNewUser) {
      const { email, displayName, uid } = data.user;
      const username = `${displayName.replace(
        /\s/g,
        '',
      )}${uid.slice(-5)}`;
      const variables = {
        email: email,
        name: displayName,
        userId: uid,
        username: username,
      };
      await createUser({ variables });
    }
  }

  async function signUpWithEmailAndPassword(formData) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        formData.email,
        formData.password,
      );

    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        email: data.user.email,
        name: formData.name,
        userId: data.user.uid,
        username: formData.username,
      };
      await createUser({ variables });
    }
  }

  async function loginWithEmailAndPassword(
    email,
    password,
  ) {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  }

  async function updateEmail(newEmail) {
    try {
      await authState.user.updateEmail(newEmail);
    } catch (err) {
      console.error(
        'error updating email in firebase',
        err,
      );
    }
  }

  async function signOut() {
    setAuthState({ status: 'loading' });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  }

  if (authState.status === 'loading') {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          loginWithGoogle,
          signUpWithEmailAndPassword,
          loginWithEmailAndPassword,
          updateEmail,
          signOut,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
