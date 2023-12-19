import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import React, { useContext, useState } from 'react'
import { View, Button, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { AppContext } from '../Context/AppContext';
import { Usuario } from '../Model/Usuario';
import FlechaRgreso from '../../assets/SVG/FlechaRegreso';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

export const Registro = () => {
    const navegate = useNavigation();
    const contexto = useContext(AppContext);
    const [usuario, setUsuario] = useState<Partial<Usuario>>({ cedula: "", contrasenia: "", email: "", id: "", tipo: "" });
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const HandleForm = async () => {
        if (password !== usuario?.contrasenia || (password === "" || usuario.contrasenia == "")) {
            setError(true);
        } else {
            if (usuario.contrasenia && usuario.cedula && usuario.email && usuario.tipo) {
                const tipo = usuario.tipo === 'Alumno' ? "0" : "1";
                const insert = {
                    cedula: usuario.cedula,
                    correo: usuario.email,
                    tipoUsuario: tipo,
                    password: usuario.contrasenia,
                };
                //Registro en la bd
                const url = 'http://10.0.2.2:8000/api/v1/usuarios/';
                await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(insert)
                })
                    .then(res => { return res.json(); })
                    .then(data => {
                        if (data.tipoUsuario) {
                            //el ultimo numero del ci
                            const ultimoCaracter = data.cedula.charAt(data.cedula.length - 1);
                            const numero = parseInt(ultimoCaracter, 10);
                            contexto.setPar(numero);
                            contexto.setUsuario({ cedula: data.cedula, email: data.correo, id: data.id, tipo: data.tipoUsuario, contrasenia: '', });
                            navegate.navigate('Login');
                            setError(false);
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'No se registro el usuario'
                            });
                        }
                    })
                    .catch(error => { console.log(error) });

            }
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
            <Pressable
                onPress={() => { navegate.goBack(); }}
                style={{ width: 50, alignSelf: 'flex-start' }}>
                <FlechaRgreso fill={'#000'} stroke={'#000'} />
            </Pressable>
            <Text style={{ fontSize: 40, textAlign: 'center', padding: 10, color: '#303030' }}>Crear una Nueva Cuenta</Text>
            <Toast
                position='top'
                bottomOffset={20}
            />
            <ScrollView style={{ width: '100%', alignSelf: 'center', flex: 1 }}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo de registro:</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            onValueChange={(value) => { setUsuario({ ...usuario, tipo: value }) }}
                            items={[
                                { label: 'Alumno', value: 'alumno' },
                                { label: 'Docente', value: 'docente' }
                            ]}
                            placeholder={{
                                label: 'Selecciona el tipo de registro...',
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
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Cedula/RUC:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="CI/RUC"
                        onChangeText={(text) => setUsuario({ ...usuario, cedula: text })}
                        value={usuario?.cedula}
                        keyboardType="default"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su correo"
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                        value={usuario?.email}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={error ? styles.redBorder : styles.input}
                        placeholder="Ingrese su contraseñna"
                        onChangeText={(text) => setUsuario({ ...usuario, contrasenia: text })}
                        value={usuario?.contrasenia}
                        keyboardType="default"
                        secureTextEntry={true}
                    />
                    {
                        error
                            ?
                            <Text style={{ color: 'red' }}>Las contraseñas no coinciden</Text>
                            :
                            <Text></Text>
                    }
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Contraseña:</Text>
                    <TextInput
                        style={error ? styles.redBorder : styles.input}
                        placeholder="Confirmar contraseñna"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        keyboardType="default"
                        secureTextEntry={true}
                    />
                    {
                        error
                            ?
                            <Text style={{ color: 'red' }}>Las contraseñas no coinciden</Text>
                            :
                            <Text></Text>
                    }
                </View>

                <Pressable
                    onPress={() => { HandleForm() }}
                    style={styles.button}>
                    <Text style={{ color: '#e8e8e8', textAlign: 'center', fontSize: 18 }}>Crear Cuenta</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
        width: '80%',
        alignSelf: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
        alignSelf: 'flex-start'
    },
    input: {
        height: 45,
        fontSize: 18,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
        borderRadius: 4,
        overflow: 'hidden',
        color: '#303030'
    },
    button: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#303030',
        borderRadius: 8,
        width: '55%',
        alignSelf: 'center',
    },
    redBorder: {
        borderColor: 'red',
        height: 45,
        fontSize: 18,
        width: '100%',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
        borderRadius: 4,
        overflow: 'hidden'
    }
});
