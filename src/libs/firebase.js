import { initializeApp } from 'firebase/app';
import 'firebase/storage';


import { firebaseConfig } from 'src/config';
import {getAuth} from "firebase/auth";

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const getStudentID = () => {
  return auth.currentUser?.uid ?? undefined;
}
