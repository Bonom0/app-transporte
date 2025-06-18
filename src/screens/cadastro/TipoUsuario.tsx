import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from "react-native";
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
      
      <TouchableOpacity style={styles.button} onPress={salvarTipo}>
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
    marginBottom: 20,
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
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});