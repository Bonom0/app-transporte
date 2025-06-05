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
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
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
  cnpj: { fontSize: 14, color: "#444" },
  endereco: { fontSize: 14, color: "#666" },
});
