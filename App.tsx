import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Empresa from "./screens/Empresa";
import Operador from "./screens/Operador";
import TipoUsuario from "./screens/TipoUsuario";
import Passageiro from "./screens/Passageiro";
import Motorista from "./screens/Motorista";

export type RootStackParamList = {
  Home: undefined;
  Empresa: undefined;
  Operador: undefined;
  TipoUsuario: undefined;
  Passageiro: undefined;
  Motorista: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Empresa" component={Empresa} />
        <Stack.Screen name="Operador" component={Operador} />
        <Stack.Screen name="TipoUsuario" component={TipoUsuario} />
        <Stack.Screen name="Passageiro" component={Passageiro} />
        <Stack.Screen name="Motorista" component={Motorista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
