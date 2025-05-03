import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig'; // importante!
import Headers from '../components/Header';
import ButtomMenu from '../components/BottomMenu';

const AlterarDados = () => {
  const [user, setUser] = useState<User | null>(null);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Usuário autenticado:', currentUser.uid);
        setUser(currentUser);
      } else {
        console.log('Usuário não autenticado');
      }
      setIsUserLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const handleUpdate = async () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!senhaAntiga) {
      Alert.alert('Erro', 'Informe sua senha atual.');
      return;
    }

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email || '', senhaAntiga);
      await reauthenticateWithCredential(user, credential);

      if (nome && nome !== user.displayName) {
        await updateProfile(user, { displayName: nome });
      }

      if (senha.length >= 6) {
        await updatePassword(user, senha);
      } else if (senha.length > 0 && senha.length < 6) {
        Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres.');
        setLoading(false);
        return;
      }

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setSenha('');
      setSenhaAntiga('');
    } catch (error: any) {
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar os dados.');
    }

    setLoading(false);
  };

  if (isUserLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#DA8A24" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Headers title="Alterar Nome/Senha" />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="UID"
          placeholderTextColor="#aaa"
          value={user?.uid || ''}
          editable={false}
          selectTextOnFocus={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Novo nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha atual"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senhaAntiga}
          onChangeText={setSenhaAntiga}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Atualizar</Text>
        )}
      </TouchableOpacity>

      <ButtomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  inputArea: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 16,
    borderColor: '#F59014',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: '#DA8A24',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AlterarDados;

