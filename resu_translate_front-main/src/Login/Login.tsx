import React, { useContext, useState } from 'react'
import { Image, View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../Context/AppContext';
import Toast from 'react-native-toast-message'
export const Login = () => {
    const navigation = useNavigation();
    const contexto = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");

    const handleLogin = async () => {
        const usuario = {
            correo: email,
            contrasenia: clave
        }
        await fetch(`http://10.0.2.2:8000/api/v1/usuarios/login/`, {           
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(res => { return res.json(); })
            .then(data => { 
                console.log(data)
                if (data.tipoUsuario) {
                    //el ultimo numero del ci
                    const ultimoCaracter = data.cedula.charAt(data.cedula.length - 1);
                    const numero = parseInt(ultimoCaracter, 10);
                    contexto.setPar(numero);
                    contexto.setUsuario({ cedula: data.cedula, email: data.correo, id: data.id, tipo: data.tipoUsuario, contrasenia: '' });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Credenciales incorrectas'
                    });
                }
            })
            .catch(error => { console.log(error) });
            

    }

    const navigateToRegistro = () => {
        navigation.navigate('Registro');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#303030' }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: '25%', backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <Image source={require('../../assets/micro.png')} style={{ borderRadius: 1000, width: 120, height: 120, marginTop: 25, borderWidth: 0.9, borderColor: '#0025AE' }} />
                <Text style={{ marginTop: 5, fontSize: 32, color: '#0025AE', fontWeight: '500' }}>RESU TRANSLATE</Text>
                <Toast
                    position='bottom'
                    bottomOffset={20}
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su correo"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Clave:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su contraseña"
                    onChangeText={(text) => setClave(text)}
                    value={clave}
                    secureTextEntry
                />

                <Pressable onPress={() => { handleLogin() }} style={styles.button}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Iniciar sesión</Text>
                </Pressable>

                <Pressable style={styles.registro} onPress={navigateToRegistro}>
                    <Text style={{ color: '#303030', textAlign: 'center', fontSize: 18 }}>Registrarse</Text>
                </Pressable>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
        alignSelf: 'flex-start',
        marginLeft: 40,
        marginTop: 20,
    },
    input: {
        color: '#303030',
        height: 45,
        fontSize: 18,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 4
    },
    button: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#303030',
        borderRadius: 8,
        width: '55%'
    },
    registro: {
        marginTop: 25,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '55%',
        borderWidth: 0.9,
        borderColor: '#30303'
    }
});
