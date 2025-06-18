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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
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
  descricao: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
  },
});