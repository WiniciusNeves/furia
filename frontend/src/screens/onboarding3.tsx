import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/onboarding';

const Onboarding = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/furia_background.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.overlay} />
            <Image
                source={require('../assets/images/Juntos.png')}
                style={styles.logo}
            />
            <Image
                source={require('../assets/images/foto3.png')}
                style={styles.mainImage}
            />
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '30%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                IA na Pegada FURIA (em Breve)
            </Text>
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '65%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                Converse com nosso bot e entre no jogo. É rápido, fácil e 100% FURIA.
            </Text>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '10%',
                    right: '10%',
                    backgroundColor: '#B87320',
                    borderRadius: 20,
                    paddingVertical: 15,
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('auth')}
            >
                <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Roboto Condensed' }}>
                    Começar o chat
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding;