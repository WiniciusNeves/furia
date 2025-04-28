import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import para navegação

const SplashScreen = () => {
    const navigation = useNavigation();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const translateX = useRef(new Animated.Value(-10)).current; // Inicializa fora da tela

    useEffect(() => {
        const timer = setInterval(() => {
            setLoadingProgress((prev) => {
                const next = prev + 0.05;
                if (next >= 1) {
                    clearInterval(timer);
                    // Delay the navigation using setTimeout
                    setTimeout(() => {
                        if (navigation && navigation.navigate) {
                            navigation.navigate('Onboarding');
                        }
                    }, 0); // Minimal delay
                }
                return next;
            });
        }, 200);

        return () => clearInterval(timer);
    }, [navigation]);
    useEffect(() => {
        Animated.timing(translateX, {
            toValue: loadingProgress * 220 - 10, // Ajuste para o movimento dentro da track
            duration: 200, // Ajuste a duração conforme necessário
            useNativeDriver: true,
        }).start();
    }, [loadingProgress, translateX]);

    return (
        <View style={styles.container}>
            <Image source={require('./assets/furia_background.png')} style={styles.background} resizeMode="cover" />
            <View style={styles.content}>
                <Image source={require('./assets/furia_logo.png')} style={styles.logo} resizeMode="contain" />
                <Image source={require('./assets/furia_nome.png')} style={styles.nome} resizeMode="contain" />

                <View style={styles.loadingTrack}>
                    <Animated.View style={[styles.dot, { transform: [{ translateX }] }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    nome: {
        width: 200,
        height: 50,
        marginBottom: 40,
    },
    loadingTrack: {
        width: 220,
        height: 4,
        backgroundColor: '#444',
        borderRadius: 2,
        marginTop: 20,
        overflow: 'hidden',
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#FFCC00',
        borderRadius: 6,
        position: 'absolute',
        top: -4,
        left: 0,
    },
});

export default SplashScreen;