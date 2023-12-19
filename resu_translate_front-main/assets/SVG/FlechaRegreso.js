import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FlechaRgreso = (props) => {
    return (
        <View style={styles.container}>
            <Svg
                height={50}
                width={50}
                viewBox="0 0 512 512"
                fill={props.fill}
                stroke={props.stroke}
                strokeWidth={25}
            >
                <Path d="M249.38 336L170 256l79.38-80M181.03 256H342" />
                <Path
                    d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                    fill="currentColor"
                    stroke={props.stroke}
                    strokeWidth={20}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FlechaRgreso;
