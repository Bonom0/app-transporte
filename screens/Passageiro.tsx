import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UFPicker from "./components/UFPicker";

export default function Passageiro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [uf, setUf] = useState("");

  const salvar = async () => {
    if (!nome || !cpf || !contato || !email || !rua || !numero || !uf) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const dados = { nome, cpf, contato, email, rua, numero, uf };
      const listaString = await AsyncStorage.getItem("passageiros");
      const lista = listaString ? JSON.parse(listaString) : [];
      lista.push(dados);
      await AsyncStorage.setItem("passageiros", JSON.stringify(lista));
      Alert.alert("Sucesso", "Passageiro salvo!");
      setNome("");
      setCpf("");
      setContato("");
      setEmail("");
      setRua("");
      setNumero("");
      setUf("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Passageiro"
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
      />
      <TextInput
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />
      <TextInput
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        style={styles.input}
      />
      <UFPicker uf={uf} setUf={setUf} />
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
