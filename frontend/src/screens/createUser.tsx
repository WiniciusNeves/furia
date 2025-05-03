import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/createUserStyer';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { REGISTER_USER_URL } from '@env';

export default function CreateUser({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');

  const handleCreateUser = async () => {
    if (password !== confirmPassword) {
      Alert.alert('As senhas devem ser iguais');
      return;
    }
  
    if (!email || !password || !displayName) {
      Alert.alert('Preencha todos os campos');
      return;
    }
  
    let photoBase64 = null;
  
    if (avatar) {
      try {
        const base64Data = await FileSystem.readAsStringAsync(avatar, {
          encoding: FileSystem.EncodingType.Base64,
        });
        photoBase64 = base64Data;
      } catch (err) {
        console.error('Erro ao converter imagem para base64:', err);
      }
    }
  
    const CreateUser = {
      email,
      password,
      displayName,
      photoBase64, // agora está correto
    };
  
    try {
      const response = await fetch(REGISTER_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CreateUser),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar usuário');
      }
  
      const data = await response.json();
      console.log(data);
      navigation.navigate('auth');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Não foi possível criar o usuário');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../assets/images/furia_background.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >

        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require('../assets/images/avatar.png')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      </ImageBackground>


      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#C18624" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#C18624"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#C18624" style={styles.icon} />
          <TextInput
            placeholder="Nickname de Usuário"
            placeholderTextColor="#C18624"
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
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

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#C18624" style={styles.icon} />
          <TextInput
            placeholder="Confirmar Senha"
            placeholderTextColor="#C18624"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText} onPress={() => navigation.goBack()}>Lembrou sua conta?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleCreateUser}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

