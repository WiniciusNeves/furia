import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/auth';
import { LOGIN_USER_URL, LOGIN_GOOGLE } from '@env';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '853140539901-o9afo7mgulcdqeg04gtdm8pv81auc03g.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        webClientId: '853140539901-o9afo7mgulcdqeg04gtdm8pv81auc03g.apps.googleusercontent.com',
        redirectUri: makeRedirectUri({ scheme: 'frontendapp' }),
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.accessToken) {
                handleGoogleLogin(authentication.accessToken);
            }
        }
    }, [response]);

    const handleGoogleLogin = async (accessToken) => {
        try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userInfo = await res.json();
    
            const backendRes = await fetch(LOGIN_GOOGLE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture,
                    googleId: userInfo.sub,
                }),
            });
    
            const data = await backendRes.json();
    
            if (backendRes.ok) {
                console.log('Usuário logado com sucesso via Google:', data);
                if (data.uid) {
                    await AsyncStorage.setItem('uid', data.uid);
                }
                navigation.navigate('Home');
            } else {
                console.error('Erro no login backend (Google):', data);
                Alert.alert('Erro', data.error || 'Erro ao logar com Google.');
            }
        } catch (error) {
            console.error('Erro ao logar com Google:', error);
        }
    };
    
    // Login com E-MAIL e SENHA (LOGIN_USER_URL)
    const handleLogin = async () => {
        if (!email || !password) {
            console.log('Preencha todos os campos!');
            return;
        }

        try {
            const res = await fetch(LOGIN_USER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log('Usuário logado com sucesso:', data);
                if (data.uid) {
                    await AsyncStorage.setItem('uid', data.uid);
                }
                navigation.navigate('Home');
            } else {
                console.error('Erro no login backend (email/senha):', data);
                Alert.alert('Erro', data.error || 'Erro ao logar com email e senha.');
            }
        } catch (error) {
            console.error('Erro ao logar:', error);
        }
    };

    // Login com GOOGLE (LOGIN_GOOGLE)
   
    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/furia_background.png')} style={styles.backgroundImage} />
            <Image source={require('../assets/images/Juntos.png')} style={styles.logo} />

            <Text style={styles.title}>Faça login para continuar!</Text>
            <Text style={styles.subtitle}>
                Entre com seu e-mail e senha para acessar seus dados, acompanhar suas atividades e aproveitar todos os recursos disponíveis.
            </Text>

            <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
                <AntDesign name="google" size={20} color="#fff" style={{ marginRight: 10 }} />
                <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="#C18624" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#C18624"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#C18624" style={styles.icon} />
                <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#C18624"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => setModalVisible(true)}>
                <Text style={styles.forgotPasswordText}>
                    Esqueceu a <Text style={{ fontWeight: 'bold' }}>senha?</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('CreateUser')}>
                <Text style={styles.registerText}>
                    Quer criar sua <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Conta?</Text>
                </Text>
            </TouchableOpacity>

            <ForgotPasswordModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                email={recoveryEmail}
                onEmailChange={setRecoveryEmail}
            />
        </View>
    );
}