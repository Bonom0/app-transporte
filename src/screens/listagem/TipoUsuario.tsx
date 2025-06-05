import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api";

interface TipoUsuario {
  id: number | string;
  descricao?: string;
}

export default function TipoUsuarioListagem() {
  const [tipos, setTipos] = useState<TipoUsuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTipos() {
      try {
        const response = await api.get("/tipousuario");
        setTipos(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTipos();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tipos de Usuário</Text>
      <FlatList
        data={tipos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.descricao ? (
              <Text style={styles.descricao}>{item.descricao}</Text>
            ) : null}
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
  tipo: { fontSize: 18, fontWeight: "600" },
  descricao: { fontSize: 14, color: "#666" },
});
