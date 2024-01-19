import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView, Modal } from 'react-native'
import FlechaRgreso from '../../assets/SVG/FlechaRegreso';
import YoutubePlayer from 'react-native-youtube-iframe';
import { AppContext } from '../Context/AppContext';
import RNPickerSelect from 'react-native-picker-select';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export const Clase = () => {
    const navigate = useNavigation();
    const contexto = useContext(AppContext);
    const [info, setInfo] = useState(false);
    const [modal, setModal] = useState(false);
    let mensaje = 'cargando informacion';

    const peticion = async (value: string) => {
        try {
            const url = {
                id_video: contexto.idVideo,
                language: value
            }
            contexto.setLenguaje(value);
            await fetch(`http://10.0.2.2:8000/api/v1/whisper/transcripcion/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(url)
            })
                .then(res => { return res.json() })
                .then(data => { contexto.setTextoWhisper(data.transcripcion); setInfo(true); });
        } catch (error: any) { console.log(error) }

    }
    const generatePDF = async () => {
        const htmlContent =
            `<html>
        <body>
            <h1>Resumen</h1>
            <p>${contexto.textoWhisper}</p>
        </body>
    </html>`;

        const options = {
            html: htmlContent,
            fileName: 'transcripcion',
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
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { navigate.goBack(); }}
                style={{ width: 50, alignSelf: 'flex-start' }}>
                <FlechaRgreso fill={'#fff'} stroke={'#fff'} />
            </Pressable>

            <YoutubePlayer
                height={250}
                play={true}
                videoId={contexto.idVideo}
            />
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => { peticion(value); }}
                    items={[
                        { label: 'Español', value: 'Spanish' },
                        { label: 'Inglés', value: 'English' },
                        { label: 'Ruso', value: 'Russian' },
                        { label: 'Francés', value: 'French' },
                        { label: 'Portugues', value: 'Portuguese' },
                        { label: 'Italiano', value: 'Italian' },
                        { label: 'Chino Simple', value: 'Chinese (Simplified)' },
                        { label: 'Chino Tradicional', value: 'Chinese (Tradicional)' },
                        { label: 'Indú', value: 'Hindi' },
                        { label: 'Coreano', value: 'Korean' },
                    ]}
                    placeholder={{
                        label: 'Selecciona el idioma...',
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
            <ScrollView style={styles.transcription}>
                <Text style={styles.textoTranscrito}>
                    {contexto.textoWhisper != "" ? contexto.textoWhisper : mensaje}
                </Text>
            </ScrollView>
            <Pressable
                onPress={() => { navigate.navigate('Resumen' as never); }}
                style={styles.btnResumen}
                disabled={!info}
            >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#303030' }}>Resumen</Text>
            </Pressable>

            <Pressable
                onPress={() => { generatePDF(); }}
                style={styles.btnResumen}
                disabled={!info}
            >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#303030' }}>Descargar transcripción</Text>
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
    videoContainer: {
        height: 150,
        width: '95%',
        alignSelf: 'center',
        marginTop: 25
    },
    transcription: {
        marginTop: 10,
        backgroundColor: '#162436',
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 20,
    },
    textoTranscrito: {
        fontSize: 20,
        color: '#e8e8e8',
        textAlign: 'left'
    },
    btnResumen: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#e8e8e8',
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        height: 45,
        fontSize: 18,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
        borderRadius: 4,
        overflow: 'hidden',
        color: '#303030',
        alignSelf: 'center'
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});
