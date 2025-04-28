import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

import { LOGIN_USER_URL } from '@env';
import styles from '../styles/auth';

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '853140539901-o9afo7mgulcdqeg04gtdm8pv81auc03g.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: '853140539901-o9afo7mgulcdqeg04gtdm8pv81auc03g.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'frontendapp',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleGoogleLogin(authentication.accessToken);
      }
    }
  }, [response]);


    async function handleGoogleLogin(accessToken: string) {
        try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userInfo = await res.json();

            const backendRes = await fetch(LOGIN_USER_URL, {
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
                console.log('Usuário registrado/logado com sucesso:', data);
                // Navegar para a tela Home
                navigation.navigate('Home');
            } else {
                console.error('Erro no login backend:', data);
            }
        } catch (error) {
            console.error('Erro ao logar com Google:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/furia_background.png')}
                style={styles.backgroundImage}
            />

            <Image
                source={require('../assets/images/Juntos.png')}
                style={styles.logo}
            />

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
                />
            </View>

            <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#C18624" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#C18624"
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu a <Text style={{ fontWeight: 'bold' }}>senha?</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerContainer}>
                <Text style={styles.registerText}>Quer criar sua <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Conta?</Text></Text>
            </TouchableOpacity>
        </View>
    );
}