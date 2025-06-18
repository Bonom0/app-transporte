import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";

export default function CadastroPassageiro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [contato, setContato] = useState("");
  const [horarioEmbarque, setHorarioEmbarque] = useState("");
  const [idMotorista, setIdMotorista] = useState("");
  const [tipo, setTipo] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [motoristas, setMotoristas] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resMotoristas, resTipos] = await Promise.all([
          api.get("/motorista"),
          api.get("/tipoUsuario"),
        ]);
        setMotoristas(resMotoristas.data);
        setTiposUsuario(resTipos.data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados");
        console.error(error);
      }
    }

    carregarDados();
  }, []);

  const salvarPassageiro = async () => {
    try {
      if (!horarioEmbarque.match(/^\d{2}:\d{2}$/)) {
        Alert.alert("Erro", "Horário de embarque deve estar no formato HH:mm");
        return;
      }

      const now = new Date();
      const [hora, minuto] = horarioEmbarque.split(":");
      const horarioISO = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Number(hora),
        Number(minuto),
        0,
        0
      ).toISOString();

      const data = {
        nome,
        email,
        cpf,
        senha,
        cep,
        rua,
        contato,
        horario_embarque: horarioISO,
        id_motorista: idMotorista,
        tipo,
        ativo,
        dta_insert: new Date().toISOString(),
      };

      await api.post("/passageiro", data);
      Alert.alert("Sucesso", "Passageiro cadastrado com sucesso!");
      limparCampos();
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar passageiro");
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setCpf("");
    setSenha("");
    setCep("");
    setRua("");
    setContato("");
    setHorarioEmbarque("");
    setIdMotorista("");
    setTipo("");
    setAtivo(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />
      <TextInput
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
        style={styles.input}
      />
      <TextInput
        placeholder="Horário de Embarque (HH:mm)"
        value={horarioEmbarque}
        onChangeText={setHorarioEmbarque}
        style={styles.input}
        keyboardType="numeric"
        maxLength={5}
      />
      
      <Text style={styles.label}>Motorista</Text>
      <Picker selectedValue={idMotorista} onValueChange={setIdMotorista} style={styles.input}>
        <Picker.Item label="Selecione um motorista" value="" />
        {motoristas.map((m: any) => (
          <Picker.Item key={m.id} label={m.nome} value={m.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.input}>
        <Picker.Item label="Selecione um tipo" value="" />
        {tiposUsuario.map((t: any) => (
          <Picker.Item key={t.id} label={t.descricao} value={t.id} />
        ))}
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} />
      </View>

      <Button title="Salvar" onPress={salvarPassageiro} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  switchLabel: {
  marginRight: 10,
  fontSize: 16,
},
});
