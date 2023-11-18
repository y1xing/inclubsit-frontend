import { initializeApp } from 'firebase/app';
import 'firebase/storage';


import { firebaseConfig } from 'src/config';

export const firebaseApp = initializeApp(firebaseConfig);
