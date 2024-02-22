import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView, View, Text, Pressable } from 'react-native'
import { Clase } from '../Model/Clases';
import { AppContext } from '../Context/AppContext';

export const Clases = () => {
    const navigate = useNavigation();
    const contexto = useContext(AppContext);
    const [clases, setClases] = useState<Clase[]>();
    useEffect(() => {
        const peticion = async () => {
            const clase = {
                ci: contexto.par,
            }
            try {
                const res = await fetch('http://10.0.2.2:8000/api/v1/clases/clasesImpar/', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(clase)
                })
                    .then(res => { return res.json() })
                    .then(data => { setClases(data); })

            } catch (error) {
                console.error('Error en la petición:', error);
            }
        }

        peticion();
    }, [])
    return (
        <ScrollView style={{ backgroundColor: '#303030', flex: 1 }}>
            {
                clases !== undefined &&
                clases.map((item, idx) => {
                    return (
                        <Pressable
                            key={idx}
                            onPress={() => {
                                navigate.navigate('Clase');
                                contexto.setIdVideo(item.id_video);
                            }}
                            style={styles.contenedorClase}>
                            <Text style={{ fontSize: 22, fontWeight: '400', color: '#000' }}>{item.nombre}</Text>
                            <Text style={styles.descripcion}>
                                {item.descripcion}
                            </Text>
                            <View style={{ borderBottomWidth: 0.9, borderBottomColor: 'blue', marginTop: 15, marginBottom: 30 }} />
                        </Pressable>
                    )
                })
            }


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contenedorClase: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 15,
        width: '85%',
        alignSelf: 'center'
    },
    tituloClase: {
        fontSize: 22,
        fontWeight: '400',
        color: '#000'
    },
    descripcion: {
        marginTop: 10,
        color: '#303030'
    }

})