import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
  getAuth,
  Auth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCePcEH9Ya8KhDLGMclUPGrIIPhmDXlk8k",
  authDomain: "chatbot-furia-c1fd2.firebaseapp.com",
  projectId: "chatbot-furia-c1fd2",
  storageBucket: "chatbot-furia-c1fd2.appspot.com",
  messagingSenderId: "853140539901",
  appId: "1:853140539901:web:6a41f38a58e1254c52f194",
  measurementId: "G-B6TCBRL9N0"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

try {
  // Tenta obter o auth já inicializado
  auth = getAuth(app);
} catch (error) {
  // Se não estiver inicializado, inicializa com persistência
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth, app };
