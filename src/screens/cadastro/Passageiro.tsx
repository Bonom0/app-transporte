import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import api from "../../services/api";
import { MaskedTextInput } from "react-native-mask-text";
import { Feather } from "@expo/vector-icons";

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

  const [senhaVisivel, setSenhaVisivel] = useState(false);

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

      <MaskedTextInput
        mask="999.999.999-99"
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
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

      <MaskedTextInput
        mask="99999-999"
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
        style={styles.input}
      />

      <MaskedTextInput
        mask="(99) 99999-9999"
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
        keyboardType="phone-pad"
        style={styles.input}
      />
      
      <MaskedTextInput
        mask="99:99"
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

      <TouchableOpacity style={styles.button} onPress={salvarPassageiro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
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