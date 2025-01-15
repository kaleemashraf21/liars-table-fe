import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDxqcELFLO8KdVmrKBzYv84_cQcIsIzL24",
  authDomain: "liars-table-be.firebaseapp.com",
  projectId: "liars-table-be",
  storageBucket: "liars-table-be.firebasestorage.app",
  messagingSenderId: "702329149219",
  appId: "1:702329149219:web:1a296b819b934fef345e96",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
