import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Empresa() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");

  const salvar = async () => {
    if (!nome || !cnpj) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const dados = { nome, cnpj };
      const listaString = await AsyncStorage.getItem("empresas");
      const lista = listaString ? JSON.parse(listaString) : [];
      lista.push(dados);
      await AsyncStorage.setItem("empresas", JSON.stringify(lista));
      Alert.alert("Sucesso", "Empresa salva!");
      setNome("");
      setCnpj("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Empresa"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
