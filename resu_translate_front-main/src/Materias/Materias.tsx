import React, { useEffect, useContext, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { AppContext } from '../Context/AppContext'
import { Materia } from '../Model/Materia';

export const Materias = () => {
    const contexto = useContext(AppContext);
    const [materia, setMateria] = useState<Materia[]>();
    const imagenes = [
        require('../../assets/negocios.jpg'),
        require('../../assets/CienciaDatos.png'),
        require('../../assets/compuNube.png'),
        require('../../assets/IA.png')
    ]
    useEffect(() => {
        const peticion = async () => {
            try {
                const isDocente = contexto.usuario.tipo == '0';
                const materia = {
                    ci: contexto.par,
                    docente: isDocente
                }
                console.log(materia)
                await fetch(`http://10.0.2.2:8000/api/v1/materias/materiasImpar/`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(materia)
                })
                    .then(res => { return res.json() })
                    .then(data => { setMateria(data); })
            }
            catch (error) { console.log(error) }
        }
        peticion();
    }, [])
    return (
        <ScrollView style={{ backgroundColor: '#303030', flex: 1 }}>



            {
                materia?.map((item, idx) => {
                    return (
                        <View key={idx} style={{ flexDirection: 'row', width: '100%', height: 150, backgroundColor: '#FFFF', marginTop: 20 }}>
                            <View style={{ width: '35%', height: '100%', padding: 20, borderRadius: 25 }}>
                                <Image source={imagenes[idx]} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            </View>

                            <View style={{ flex: 1, padding: 10 }}>
                                <Text style={{ fontSize: 22, fontWeight: '400', color: '#000' }}>{item.nombre}</Text>
                                <Text style={{ marginTop: 10 }}>
                                    {item.semestre}
                                </Text>
                                <View style={{ borderBottomWidth: 0.9, borderBottomColor: 'blue', marginTop: 15 }} />
                            </View>
                        </View>
                    )
                })
            }

        </ScrollView>
    )
}
