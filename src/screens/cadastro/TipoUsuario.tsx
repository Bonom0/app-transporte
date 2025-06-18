import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

export default function CadastroTipoUsuario() {
  const [descricao, setDescricao] = useState("");

  const salvarTipo = async () => {
    try {
      await api.post("/tipousuario", { descricao });
      Alert.alert("Sucesso", "Tipo de usuário cadastrado!");
      setDescricao("");
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar tipo de usuário");
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
      <Button title="Salvar" onPress={salvarTipo} />
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
