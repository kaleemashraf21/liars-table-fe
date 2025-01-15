import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebaseConfig";

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const avatar =
    "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png";

  const handleSignUp = async () => {
    if (username !== "" && password !== "" && email !== "") {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const currentUser = auth.currentUser;
        navigation.navigate("Home");
        if (currentUser) {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);
          const response = await fetch(
            "https://liars-table-be.onrender.com/api/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({ email, username, avatar }),
            }
          );
          console.log(avatar);
          const responseData = await response.json();
          console.log("Backend Response:", responseData);
        }
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setError("pleaase complete all relevent fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
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
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: { color: "red", marginBottom: 12 },
});

export default SignUpScreen;
