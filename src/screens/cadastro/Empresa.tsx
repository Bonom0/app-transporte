import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

export default function CadastroEmpresa() {
  const [fantasia, setFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");

  const salvarEmpresa = async () => {
    try {
      await api.post("/empresa", { fantasia, cnpj });
      Alert.alert("Sucesso", "Empresa cadastrada com sucesso!");
      setFantasia("");
      setCnpj("");
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar empresa");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Empresa"
        value={fantasia}
        onChangeText={setFantasia}
        style={styles.input}
      />
      <TextInput
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvarEmpresa} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
