import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MenuItem from '../components/Menu/MenuItem';
import addidasImage from '../assets/addidas.png';
import estudiantesImage from '../assets/estudiantes.png';
import maestrosImage from '../assets/maestros.png';
import estadisticasImage from '../assets/estadisticas.png';
    const RopaScreen = ({ navigation }) => {
        const handleAgregarPress = () => {
            navigation.navigate('Reciclable')
        };
      
        const handleAlumnosPress = () => {
            navigation.navigate('Usuarios')
        };
      
        const handleMaestrosPress = () => {
            navigation.navigate('Login')
        };
      
        const handleEstadisticasPress = () => {
            navigation.navigate('Login')
        };
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menuRow}>
          <MenuItem
            icon={addidasImage}
            label="Reciclables"
            onPress={handleAgregarPress}
          />
          <MenuItem
            icon={estudiantesImage}
            label="Usuarios"
            onPress={handleAlumnosPress}
          />
        </View>
        <View style={styles.menuRow}>
          <MenuItem
            icon={maestrosImage}
            label="Accesorios"
            onPress={handleMaestrosPress}
          />
          <MenuItem
            icon={estadisticasImage}
            label="Bolsas"
            onPress={handleEstadisticasPress}
          />
        </View>
      </ScrollView>
    );
  };
const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#f0f0f0', // Coloca el color adecuado del fondo
    },
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20, // Ajustar el margen según sea necesario
    },
});
export default RopaScreen;