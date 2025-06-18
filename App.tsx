import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SplashScreen from "expo-splash-screen";

import Empresa from "./src/screens/cadastro/Empresa";
import Passageiro from "./src/screens/cadastro/Passageiro";
import TipoUsuario from "./src/screens/cadastro/TipoUsuario";
import Operador from "./src/screens/cadastro/Operador";
import Motorista from "./src/screens/cadastro/Motorista";
import Home from "./src/screens/Home";

import PassageiroListagem from "./src/screens/listagem/Passageiro";
import EmpresaListagem from "./src/screens/listagem/Empresa";
import TipoUsuarioListagem from "./src/screens/listagem/TipoUsuario";
import ListagemOperador from "./src/screens/listagem/Operador";
import ListagemMotorista from "./src/screens/listagem/Motorista";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const [cadastrosExpanded, setCadastrosExpanded] = useState(false);
  const [listagemExpanded, setListagemExpanded] = useState(false);

  useEffect(() => {
    async function loadApp() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }

    loadApp();
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerContainer}>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
          onPress={() => props.navigation.navigate("Home")}
          labelStyle={styles.drawerLabel}
        />

        {/* GRUPO CADASTROS */}
        <TouchableOpacity
          style={styles.menuGroup}
          onPress={() => setCadastrosExpanded(!cadastrosExpanded)}
        >
          <View style={styles.groupHeader}>
            <Icon name="account-plus-outline" size={20} color="#333" />
            <Text style={styles.menuGroupText}>Cadastros</Text>
            <Icon
              name={cadastrosExpanded ? "chevron-down" : "chevron-right"}
              size={20}
              color="#555"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </TouchableOpacity>

        {cadastrosExpanded && (
          <View style={styles.subMenu}>
            <DrawerItem label="Empresa" onPress={() => props.navigation.navigate("Empresa")} icon={() => <Icon name="office-building" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Passageiro" onPress={() => props.navigation.navigate("Passageiro")} icon={() => <Icon name="account" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Tipo Usuário" onPress={() => props.navigation.navigate("TipoUsuario")} icon={() => <Icon name="account-cog" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Operador" onPress={() => props.navigation.navigate("Operador")} icon={() => <Icon name="account-tie" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Motorista" onPress={() => props.navigation.navigate("Motorista")} icon={() => <Icon name="steering" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
          </View>
        )}

        {/* GRUPO LISTAGEM */}
        <TouchableOpacity
          style={styles.menuGroup}
          onPress={() => setListagemExpanded(!listagemExpanded)}
        >
          <View style={styles.groupHeader}>
            <Icon name="format-list-bulleted" size={20} color="#333" />
            <Text style={styles.menuGroupText}>Listagem</Text>
            <Icon
              name={listagemExpanded ? "chevron-down" : "chevron-right"}
              size={20}
              color="#555"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </TouchableOpacity>

        {listagemExpanded && (
          <View style={styles.subMenu}>
            <DrawerItem label="Passageiro" onPress={() => props.navigation.navigate("ListagemPassageiro")} icon={() => <Icon name="account" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Operador" onPress={() => props.navigation.navigate("ListagemOperador")} icon={() => <Icon name="account-tie" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Tipo Usuário" onPress={() => props.navigation.navigate("ListagemTipoUsuario")} icon={() => <Icon name="account-cog" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Empresa" onPress={() => props.navigation.navigate("ListagemEmpresa")} icon={() => <Icon name="office-building" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
            <DrawerItem label="Motorista" onPress={() => props.navigation.navigate("ListagemMotorista")} icon={() => <Icon name="steering" size={18} color="#666" />} labelStyle={styles.subMenuLabel} />
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="Home"
      >
        {/* Telas principais */}
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Empresa" component={Empresa} />
        <Drawer.Screen name="Passageiro" component={Passageiro} />
        <Drawer.Screen name="TipoUsuario" component={TipoUsuario} options={{ drawerLabel: "Tipo Usuário", title: "Tipo Usuário" }} />
        <Drawer.Screen name="Operador" component={Operador} />
        <Drawer.Screen name="Motorista" component={Motorista} />

        {/* Listagens */}
        <Drawer.Screen name="ListagemPassageiro" component={PassageiroListagem} />
        <Drawer.Screen name="ListagemOperador" component={ListagemOperador} />
        <Drawer.Screen name="ListagemTipoUsuario" component={TipoUsuarioListagem} options={{ drawerLabel: "Tipo Usuário", title: "Tipo Usuário" }} />
        <Drawer.Screen name="ListagemEmpresa" component={EmpresaListagem} />
        <Drawer.Screen name="ListagemMotorista" component={ListagemMotorista} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    paddingVertical: 10,
  },
  menuGroup: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuGroupText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subMenu: {
    paddingLeft: 20,
    backgroundColor: "#fafafa",
  },
  subMenuLabel: {
    fontSize: 14,
    color: "#444",
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});