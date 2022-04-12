import React, { useContext, useEffect, useState } from 'react';
import { auth, database } from '../Firebase/config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import Signup from './../components/Signup';
import { async } from '@firebase/util';
import { uid } from 'uid';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  ///////////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));

    return () => unsubscribe();
  }, []);
  /////////////

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const getNameFromEmail = async user => {
  const email = user.email;
  const docRef = doc(database, 'users', email);
  const userName = await getDoc(docRef);
  return userName.exists() ? userName.data()['name'] : 'not found';
};

export const addNote = async (noteTitle, noteDetails, email) => {
  const docRef = await setDoc(doc(database, 'notes', email, 'notes', uid(16)), {
    title: noteTitle,
    details: noteDetails,
    date: serverTimestamp(),
  });
};

export const getAllNotesByUser = user => {
  const unsub = onSnapshot(
    doc(database, 'notes', user.email, 'notes'),
    doc => {}
  );
};

export const deleteNote = async (email, noteId) => {
  await deleteDoc(doc(database, 'notes', email, 'notes', noteId));
};

export default AuthContext;
