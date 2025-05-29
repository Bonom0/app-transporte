import React from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="Cadastro de Empresa"
        onPress={() => navigation.navigate("Empresa")}
      />
      <Button
        title="Cadastro de Operador"
        onPress={() => navigation.navigate("Operador")}
      />
      <Button
        title="Cadastro de Tipo de Usuário"
        onPress={() => navigation.navigate("TipoUsuario")}
      />
      <Button
        title="Cadastro de Passageiro"
        onPress={() => navigation.navigate("Passageiro")}
      />
      <Button
        title="Cadastro de Motorista"
        onPress={() => navigation.navigate("Motorista")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
});
