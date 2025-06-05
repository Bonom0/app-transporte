import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Motorista() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const salvar = async () => {
    if (!nome || !cpf || !contato || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const dados = { nome, cpf, contato, email, senha };
      const listaString = await AsyncStorage.getItem("motoristas");
      const lista = listaString ? JSON.parse(listaString) : [];
      lista.push(dados);
      await AsyncStorage.setItem("motoristas", JSON.stringify(lista));
      Alert.alert("Sucesso", "Motorista salvo!");
      setNome("");
      setCpf("");
      setContato("");
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
        placeholder="Nome do Motorista"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
      />
      <TextInput
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
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
