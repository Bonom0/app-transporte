import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.gestor}>Gestor</Text>
        <Text style={styles.passageiro}>Passageiro</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  gestor: {
    color: "blue",
  },
  passageiro: {
    color: "black",
  },
});
