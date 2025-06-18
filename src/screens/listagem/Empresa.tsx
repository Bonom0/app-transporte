import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api";

interface Empresa {
  id: number | string;
  fantasia: string;
  cnpj: string;
}

export default function EmpresaListagem() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await api.get("/empresa");
        setEmpresas(response.data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Empresas</Text>
      <FlatList
        data={empresas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.fantasia}</Text>
            <Text style={styles.cnpj}>CNPJ: {item.cnpj}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2C3E50",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  nome: {
    fontSize: 20,
    fontWeight: "700",
    color: "#34495E",
    marginBottom: 6,
  },
  cnpj: {
    fontSize: 14,
    color: "#7F8C8D",
    letterSpacing: 0.5,
  },
});
