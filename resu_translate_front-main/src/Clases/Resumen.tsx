import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View, ScrollView, Pressable, Text, StyleSheet, Modal } from 'react-native'
import FlechaRgreso from '../../assets/SVG/FlechaRegreso';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { AppContext } from '../Context/AppContext';
export const Resumen = () => {
    const navigate = useNavigation();
    const contexto = useContext(AppContext);
    const [resumen, setResumen] = useState("Trabajando en el resumen...");
    const [modal, setModal] = useState(false);
    const generatePDF = async () => {
        const htmlContent =
            `<html>
            <body>
                <h1>Resumen</h1>
                <p>${resumen}</p>
            </body>
        </html>`;

        const options = {
            html: htmlContent,
            fileName: 'resumen',
            directory: 'Documents',
        };

        try {
            const file = await RNHTMLtoPDF.convert(options);
            console.log(file.filePath);
            setModal(true);
        } catch (error) {
            console.error(error);
        }
    };
    //peticion para el resumen
    useEffect(() => {
        const peticion = async () => {
            const msg = {
                message: contexto.textoWhisper,
                language: contexto.lenguaje
            }
            try {
                await fetch(`http://10.0.2.2:8000/api/v1/whisper/resumen/`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(msg)
                })
                    .then(res => { return res.json() })
                    .then(data => { setResumen(data.message); });
            } catch (error: any) { console.log(error) }
        }
        peticion();
    }, [])
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { navigate.goBack(); }}
                style={{ width: 50, alignSelf: 'flex-start' }}>
                <FlechaRgreso fill={'#fff'} stroke={'#fff'} />
            </Pressable>
            <ScrollView style={styles.resumenContainer}>
                <Text style={styles.textoResumen}>
                    {resumen}
                </Text>
            </ScrollView>
            <Pressable
                onPress={generatePDF}
                style={styles.btnDescargar}>
                <Text style={{ fontSize: 20, color: '#303030', fontWeight: '700' }}>Descargar</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Se creo el pdf!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModal(!modal)}>
                            <Text style={styles.textStyle}>Cerrar modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        flex: 1
    },
    resumenContainer: {
        marginTop: 25,
        backgroundColor: '#162436',
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 20,
    },
    textoResumen: {
        fontSize: 20,
        color: '#e8e8e8',
        textAlign: 'left'
    },
    btnDescargar: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#e8e8e8',
        marginTop: 20,
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#000'
    },
});
