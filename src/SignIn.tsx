import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleAuthProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      const response = await fetch("http://localhost:3001/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const userData = await response.json();
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: { color: "red", marginBottom: 12 },
});

export default SignInScreen;
