import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import RopaScreen from '../screens/RopaScreen';
import AgregarScreen from '../screens/AgregarScreen';
import UsuariosScreen from '../screens/UsuariosScreen'
import TransactionScreen from '../screens/TransactionScreen'
const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Ropa" component={RopaScreen} />
            <Stack.Screen name="Reciclable" component={AgregarScreen} />
            <Stack.Screen name="Usuarios" component={UsuariosScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            {/* Aquí se pueden agregar más pantallas a medida que se crean */}
        </Stack.Navigator>
    );
};
export default AppNavigator;