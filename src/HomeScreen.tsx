import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "./config/firebaseConfig";
import Users from "./Users";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [authorised, setAuthorised] = useState(false || window.localStorage.getItem("auth")==="true");
  const [token, setToken] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        setAuthorised(true);
        window.localStorage.setItem("auth", "true")
        userCred.getIdToken().then((token) => {
          console.log(token)
          setToken(token)
        })
      } else {
        setAuthorised(false);
      }
    });

    return () => unsubscribe();
  }, []); 


  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        console.log(userCred);
        window.localStorage.setItem("auth", "true")
        setAuthorised(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      {authorised ? (
        <>
        <Text>Welcome to cards</Text>
        <Users token={token}/>
        </>
      ) : (
        <Button title="Login with Google" onPress={loginWithGoogle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;