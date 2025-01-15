import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = ({ route }: { route: any }) => {
  // const { userEmail } = route.params;
  console.log(route);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, !</Text>
      <Text>You're now logged in to Liar's Table.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
