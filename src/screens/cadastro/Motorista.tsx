import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";

interface TipoUsuario {
  id: string;
  descricao: string;
}

export default function Motorista() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuarioId, setTipoUsuarioId] = useState("");

  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuario[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resTipos = await api.get("/tipoUsuario");
        setTiposUsuario(resTipos.data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar tipos de usuário");
      }
    }

    carregarDados();
  }, []);

  const salvar = async () => {
    if (!nome || !cpf || !contato || !email || !senha || !tipoUsuarioId) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      await api.post("/motorista", {
        nome,
        cpf,
        contato,
        email,
        senha,
        tipo: tipoUsuarioId,
      });
      Alert.alert("Sucesso", "Motorista salvo com sucesso!");
      setNome("");
      setCpf("");
      setContato("");
      setEmail("");
      setSenha("");
      setTipoUsuarioId("");
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

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={tipoUsuarioId}
        onValueChange={(itemValue) => setTipoUsuarioId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o tipo de usuário" value="" />
        {tiposUsuario.map((tipo) => (
          <Picker.Item key={tipo.id} label={tipo.descricao} value={tipo.id} />
        ))}
      </Picker>

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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
