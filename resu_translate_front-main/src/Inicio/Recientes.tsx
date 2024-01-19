import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
interface IRecientes {
    title: string;
    image: any;
}
export const Recientes = () => {
    const data: IRecientes[] = [
        { title: 'Computación', image: require('../../assets/compuNube.png') },
        { title: 'Ia', image: require('../../assets/IA.png') },
        { title: 'Ia', image: require('../../assets/IA.png') },
        { title: 'Ia', image: require('../../assets/IA.png') },
    ];
    return (
        <View style={styles.container}>
            {
                data.map((item, idx) => {
                    return (
                        <View key={idx} style={styles.containerImage}>
                            <Image style={styles.image} alt='img' source={item.image} resizeMode='cover'/>
                            <Text style={styles.textImage}>{item.title}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 25
    },
    containerImage: {
        width: '45%',
        height: 150,
        backgroundColor: '#242424',
        borderRadius: 25,
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: '80%'
    },
    textImage: {
        textAlign: 'center',
        color: '#e8e8e8',
        fontSize: 18,
        fontWeight: 'bold'
    }
});