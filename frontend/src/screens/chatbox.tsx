import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import styles from '../styles/chatbot';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { CHATBOT_URL } from '@env';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'O que eu posso ajudar?', sender: 'bot' },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch(CHATBOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: input, userId: 'defaultUserId' }), // Replace 'defaultUserId' with the actual user ID logic

      });

      const data = await response.json();
      const botReply = {
        id: Date.now().toString() + '_bot',
        text: data.resposta || 'Não entendi. Pode repetir?',
        sender: 'bot',
      };
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      const botError = {
        id: Date.now().toString() + '_error',
        text: 'Erro ao conectar com o bot.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, botError]);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.user : styles.bot]}>
      {item.sender === 'bot' && (
        <Image source={require('../assets/images/chatbot.png')} style={styles.botIcon} />
      )}
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Chatbot" />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatArea}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputArea}
      >
        <TextInput
          style={styles.input}
          placeholder="Escreva sua pergunta?"
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <BottomMenu />
    </View>
  );
};

export default Chatbot;
