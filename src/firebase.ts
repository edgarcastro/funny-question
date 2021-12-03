import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const {
  REACT_APP_EMULATORS_ENABLED: emulatorsEnabled,
} = process.env;


const getConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FB_API_KEY || 'localKey',
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID || 'test-venus',
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

const app = initializeApp(getConfig);

const db = getFirestore();

if (emulatorsEnabled === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { app, db };
