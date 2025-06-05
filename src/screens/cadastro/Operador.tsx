import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Operador() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const salvar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const dados = { nome, email, senha };
      const listaString = await AsyncStorage.getItem("operadores");
      const lista = listaString ? JSON.parse(listaString) : [];
      lista.push(dados);
      await AsyncStorage.setItem("operadores", JSON.stringify(lista));
      Alert.alert("Sucesso", "Operador salvo!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Operador"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
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
