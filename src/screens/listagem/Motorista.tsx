import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api";

interface Motorista {
  id: number | string;
  nome: string;
  email: string;
}

export default function MotoristaListagem() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMotoristas() {
      try {
        const response = await api.get("/motorista");
        setMotoristas(response.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMotoristas();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Motoristas</Text>
      <FlatList
        data={motoristas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>E-mail: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  loading: { flex: 1, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  item: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  nome: { fontSize: 18, fontWeight: "600" },
  email: { fontSize: 14, color: "#444" },
});
