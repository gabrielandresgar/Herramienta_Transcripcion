import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
interface CarouselItem {
    title: string;
    image: any;
}
export const Carrusel = () => {
    const data: CarouselItem[] = [
        { title: 'Computo', image: require('../../assets/compuNube.png') },
        { title: 'Ia', image: require('../../assets/IA.png') },
        { title: 'Ciencia de datos', image: require('../../assets/CienciaDatos.png') },
    ];

    const renderItem = ({ item }: { item: CarouselItem }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'left', fontSize: 32, width: '100%', marginLeft: 40, marginBottom: 20, color: '#e8e8e8' }}>Materia</Text>
            <Carousel
                vertical={false}
                layout="default"
                data={data}
                renderItem={renderItem}
                sliderWidth={300}
                itemWidth={120}
                inactiveSlideScale={0.8} // Escala para las diapositivas inactivas
                inactiveSlideOpacity={0.7} // Opacidad para las diapositivas inactivas
                activeSlideAlignment="start" // Alineación de la diapositiva activa
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15
    },
    slide: {
        height: 150,
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 2,
        color: '#303030',
        textAlign: 'center'
    }
});

