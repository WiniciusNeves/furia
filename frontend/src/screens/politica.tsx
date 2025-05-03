import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Headers from '../components/Header';
import ButtomMenu from '../components/BottomMenu';

const Politica = () => {
  return (
    <View style={styles.container}>
      <Headers title="Política e Termos" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Política de Privacidade</Text>
        <Text style={styles.text}>
          Seus dados pessoais são tratados com segurança e nunca serão compartilhados com terceiros sem seu consentimento. Utilizamos seus dados apenas para autenticação e funcionalidades do aplicativo.
        </Text>

        <Text style={styles.title}>Termos de Uso</Text>
        <Text style={styles.text}>
          Ao utilizar este aplicativo, você concorda em fornecer informações verdadeiras, manter sua conta segura e respeitar os demais usuários. Reservamo-nos o direito de atualizar os termos a qualquer momento.
        </Text>
      </ScrollView>
      <ButtomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#DA8A24',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Politica;
