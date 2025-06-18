import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";

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

  const [senhaVisivel, setSenhaVisivel] = useState(false);

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

      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!senhaVisivel}
          style={styles.senhaInput}
        />
        <Feather
          name={senhaVisivel ? "eye" : "eye-off"}
          size={20}
          color="#666"
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          style={styles.iconeOlho}
        />
      </View>

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

      <TouchableOpacity style={styles.button} onPress={salvar}>
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
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
  senhaContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#fff",
  marginBottom: 16,
  paddingHorizontal: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
  },
  senhaInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  iconeOlho: {
    padding: 10,
  },
});
