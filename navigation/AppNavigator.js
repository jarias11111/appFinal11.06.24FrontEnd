import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            {/* Aquí se pueden agregar más pantallas a medida que se crean */}
        </Stack.Navigator>
    );
};
export default AppNavigator;