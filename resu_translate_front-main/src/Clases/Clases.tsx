import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView, View, Text, Pressable } from 'react-native'
import { Clase } from '../Model/Clases';
import { AppContext } from '../Context/AppContext';
import RNPickerSelect from 'react-native-picker-select';


export const Clases = () => {
    const navigate = useNavigation();
    const contexto = useContext(AppContext);
    const [clases, setClases] = useState<Clase[]>();
    const [clasesFiltradas, setClasesFiltradas] = useState<Clase[]>();
    const [nombresUnicos, setNombresUnicos] = useState([]);

    const filtro = (value: string) => {
        const clasesFiltradas = clases?.filter((item) => item.nombre === value);
        if (clasesFiltradas?.length === 0){
            setClasesFiltradas(clases);
        }
        setClasesFiltradas(clasesFiltradas);
                                                                                                                                                                                                                                                                    
    }

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
                    .then(data => { 
                        setClasesFiltradas(data);
                        setClases(data);
                    
                        const nombresUnicos = data.reduce((acc: { label: any; value: any; }[], materia: { nombre: string; }) => {
                            const nombreNormalizado = materia.nombre.trim().toLowerCase();
                      
                            if (!acc.some(item => item.label.trim().toLowerCase() === nombreNormalizado)) {
                              acc.push({ label: materia.nombre, value: materia.nombre });
                            }
                            return acc;
                          }, []);

                        setNombresUnicos(nombresUnicos);
                       
                    })

            } catch (error) {
                console.error('Error en la petición:', error);
            }
        }

        peticion();
    }, [])
    return (
        <ScrollView style={{ backgroundColor: '#303030', flex: 1 }}>
            <View style={styles.input}>
            <RNPickerSelect
                    onValueChange={(value) => { filtro(value); }}
                    items={nombresUnicos}
                    placeholder={{
                        label: 'Selecciona la clase',
                        value: null,
                    }}
                    style={{
                        inputAndroid: {
                            height: '100%',
                            fontSize: 20,
                            color: '#303030',
                            backgroundColor: '#fff'
                        },
                        inputIOS: {
                            fontSize: 16,
                            color: '#fff',
                        },
                    }}
                />
            </View>
            
            {
                clasesFiltradas?.map((item, idx) => {
                    return (
                        <Pressable
                            key={idx}
                            onPress={() => {
                                navigate.navigate('Clase' as never);
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
    },
    input: {
        height: 45,
        fontSize: 18,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 8,
        paddingLeft: 8,
        borderRadius: 4,
        overflow: 'hidden',
        color: '#303030',
        alignSelf: 'center'
    }

})