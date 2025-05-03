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
                source={require('../assets/images/foto1.png')}
                style={styles.mainImage}
            />
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '30%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                Seja Bem-vindo(a).
                ao Bando de Feras
            </Text>
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '65%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                Você não é só mais um fã.
                Aqui, você faz parte da matilha!
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
                onPress={() => navigation.navigate('onboarding2')}
            >
                <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Roboto Condensed' }}>
                    Entrar na matilha
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding;