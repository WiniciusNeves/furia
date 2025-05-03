import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/auth';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '853140539901-o9afo7mgulcdqeg04gtdm8pv81auc03g.apps.googleusercontent.com',
    androidClientId: '853140539901-9nnh3vprjrrj5dp7k96icld9r6n0svs8.apps.googleusercontent.com',
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

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const credential = GoogleAuthProvider.credential(null, accessToken);
      const userCredential = await signInWithCredential(auth, credential);

      console.log('Login Google com Firebase:', userCredential.user);

      await AsyncStorage.setItem('uid', userCredential.user.uid);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.log('Erro no login com Google (Firebase):', error);
      Alert.alert('Erro', 'Não foi possível autenticar com Google.');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login com Firebase:', userCredential.user);

      await AsyncStorage.setItem('uid', userCredential.user.uid);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.log('Erro no login com Firebase:', error);
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

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
