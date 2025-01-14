import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [authorised, setAuthorised] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorised(true); // User is logged in
      } else {
        setAuthorised(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const handleSignIn = async () => {
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setAuthorised(true); // Set the user as authorised
      navigation.navigate("Home"); // Navigate to Home screen on successful sign-in
    } catch (err: any) {
      setError(err.message); // Handle error and show it to the user
    }
  };

  return (
    <View style={styles.container}>
      {authorised ? (
        <Text>Welcome, you are logged in!</Text>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button title="Sign In" onPress={handleSignIn} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "80%",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default HomeScreen;
