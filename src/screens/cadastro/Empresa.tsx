import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from "react-native";
import api from "../../services/api";
import { MaskedTextInput } from "react-native-mask-text";

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

      <MaskedTextInput
        mask="99.999.999/9999-99"
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.button} onPress={salvarEmpresa}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
