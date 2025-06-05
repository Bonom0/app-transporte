import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Empresa from "./src/screens/cadastro/Empresa";
import Passageiro from "./src/screens/cadastro/Passageiro";
import TipoUsuario from "./src/screens/cadastro/TipoUsuario";
import Operador from "./src/screens/cadastro/Operador";
import Motorista from "./src/screens/cadastro/Motorista";
import Home from "./src/screens/Home";

import PassageiroListagem from "./src/screens/listagem/Passageiro";
import EmpresaListagem from "./src/screens/listagem/Empresa";
import TipoUsuarioListagem from "./src/screens/listagem/TipoUsuario";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const [cadastrosExpanded, setCadastrosExpanded] = useState(false);
  const [listagemExpanded, setListagemExpanded] = useState(false);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />

      {/* Grupo CADASTROS */}
      <TouchableOpacity
        style={styles.menuGroup}
        onPress={() => setCadastrosExpanded(!cadastrosExpanded)}
      >
        <Text style={styles.menuGroupText}>
          CADASTROS {cadastrosExpanded ? "▼" : "▶"}
        </Text>
      </TouchableOpacity>

      {cadastrosExpanded && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Empresa"
            onPress={() => props.navigation.navigate("Empresa")}
          />
          <DrawerItem
            label="Passageiro"
            onPress={() => props.navigation.navigate("Passageiro")}
          />
          <DrawerItem
            label="Tipo Usuário"
            onPress={() => props.navigation.navigate("TipoUsuario")}
          />
          <DrawerItem
            label="Operador"
            onPress={() => props.navigation.navigate("Operador")}
          />
          <DrawerItem
            label="Motorista"
            onPress={() => props.navigation.navigate("Motorista")}
          />
        </View>
      )}

      {/* Grupo LISTAGEM */}
      <TouchableOpacity
        style={styles.menuGroup}
        onPress={() => setListagemExpanded(!listagemExpanded)}
      >
        <Text style={styles.menuGroupText}>
          LISTAGEM {listagemExpanded ? "▼" : "▶"}
        </Text>
      </TouchableOpacity>

      {listagemExpanded && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Passageiro"
            onPress={() => props.navigation.navigate("ListagemPassageiro")}
          />
          <DrawerItem
            label="Operador"
            onPress={() => props.navigation.navigate("ListagemOperador")}
          />
          <DrawerItem
            label="Tipo Usuário"
            onPress={() => props.navigation.navigate("ListagemTipoUsuario")}
          />
          <DrawerItem
            label="Empresa"
            onPress={() => props.navigation.navigate("ListagemEmpresa")}
          />
          <DrawerItem
            label="Motorista"
            onPress={() => props.navigation.navigate("ListagemMotorista")}
          />
        </View>
      )}
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
        <Drawer.Screen name="Home" component={Home} />

        {/* Telas de cadastro */}
        <Drawer.Screen name="Empresa" component={Empresa} />
        <Drawer.Screen name="Passageiro" component={Passageiro} />
        <Drawer.Screen name="TipoUsuario" component={TipoUsuario} />
        <Drawer.Screen name="Operador" component={Operador} />
        <Drawer.Screen name="Motorista" component={Motorista} />

        {/* Telas de listagem */}
        <Drawer.Screen
          name="ListagemPassageiro"
          component={PassageiroListagem}
        />
        {/* <Drawer.Screen name="ListagemOperador" component={ListagemOperador} /> */}
        <Drawer.Screen
          name="ListagemTipoUsuario"
          component={TipoUsuarioListagem}
        />
        <Drawer.Screen name="ListagemEmpresa" component={EmpresaListagem} />
        {/* <Drawer.Screen name="ListagemMotorista" component={ListagemMotorista} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuGroup: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#eee",
  },
  menuGroupText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subMenu: {
    paddingLeft: 20,
  },
});
