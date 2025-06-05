import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api"; // ajuste o caminho conforme sua estrutura

interface Passageiro {
  id: number;
  nome: string;
  email: string;
}

export default function ListagemPassageiro() {
  const [passageiros, setPassageiros] = useState<Passageiro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPassageiros() {
      try {
        const response = await api.get("/passageiro");
        setPassageiros(response.data);
      } catch (error) {
        console.error("Erro ao buscar passageiros:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPassageiros();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Passageiros</Text>
      <FlatList
        data={passageiros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  nome: {
    fontSize: 18,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});
