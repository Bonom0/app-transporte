import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";

interface Empresa {
  id: string;
  fantasia: string;
}

interface TipoUsuario {
  id: string;
  descricao: string;
}

export default function Operador() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [tipoUsuarioId, setTipoUsuarioId] = useState("");

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [tiposUsuario, setTipoUsuario] = useState<TipoUsuario[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resEmpresas, resTipos] = await Promise.all([
          api.get("/empresa"),
          api.get("/tipoUsuario"),
        ]);
        setEmpresas(resEmpresas.data);
        setTipoUsuario(resTipos.data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados do servidor");
      }
    }

    carregarDados();
  }, []);

  const salvar = async () => {
    if (!nome || !email || !senha || !empresaId || !tipoUsuarioId) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      await api.post("/operador", {
        nome,
        email,
        senha,
        empresa: empresaId,
        tipo: tipoUsuarioId,
      });
      Alert.alert("Sucesso", "Operador salvo com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setEmpresaId("");
      setTipoUsuarioId("");
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

      <Text style={styles.label}>Empresa</Text>
      <Picker
        selectedValue={empresaId}
        onValueChange={(itemValue) => setEmpresaId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma empresa" value="" />
        {empresas.map((empresa) => (
          <Picker.Item
            key={empresa.id}
            label={empresa.fantasia}
            value={empresa.id}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={tipoUsuarioId}
        onValueChange={(itemValue) => setTipoUsuarioId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o tipo de usuário" value="" />
        {tiposUsuario.map((tipo) => (
          <Picker.Item
            key={tipo.id}
            label={tipo.descricao}
            value={tipo.id}
          />
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
    marginBottom: 5,
    fontWeight: "bold",
  },
});
