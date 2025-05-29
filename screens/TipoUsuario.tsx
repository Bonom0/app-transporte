import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TipoUsuario() {
  const [descricao, setDescricao] = useState("");

  const salvar = async () => {
    if (!descricao) {
      Alert.alert("Erro", "Preencha o campo descrição");
      return;
    }
    try {
      const dados = { descricao };
      const listaString = await AsyncStorage.getItem("tiposUsuario");
      const lista = listaString ? JSON.parse(listaString) : [];
      lista.push(dados);
      await AsyncStorage.setItem("tiposUsuario", JSON.stringify(lista));
      Alert.alert("Sucesso", "Tipo de usuário salvo!");
      setDescricao("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Descrição do Tipo de Usuário"
        value={descricao}
        onChangeText={setDescricao}
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
