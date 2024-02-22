import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Carrusel } from './Carrusel';
import { Recientes } from './Recientes';


export const Inicio = () => {

    return (
        <View style={styles.container}>
            <Carrusel/>
            <Text style={styles.title}>Más recientes</Text>
            <Recientes/>
        </View>
    );
};


export default Inicio;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        flex: 1
    },
    title: {
        fontSize: 32,
        color: '#e8e8e8',
        marginTop: 25,
        marginLeft: 20,
        textAlign: 'left'
    }
});
