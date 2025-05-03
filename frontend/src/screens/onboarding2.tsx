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
                source={require('../assets/images/foto2.png')}
                style={styles.mainImage}
            />
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '30%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                Seu Fandom Importa
            </Text>
            <Text style={{ color: 'white', fontSize: 26, position: 'absolute', top: '65%', left: '10%', right: '10%', textAlign: 'center', fontFamily: 'Roboto Condensed' }}>
                Queremos conhecer você. Seus ídolos, sua região, sua paixão!
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
                onPress={() => navigation.navigate('onboarding3')}
            >
                <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Roboto Condensed' }}>
                Vamos nessa
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding;