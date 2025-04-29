import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import styles from '../styles/modalStyles';

export default function ForgotPasswordModal({ visible, onClose, email, onEmailChange }) {
    const handleSendReset = async () => {
        if (!email) {
            Alert.alert("Erro", "Digite um email válido.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Sucesso", "Email de recuperação enviado!");
            onClose();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível enviar o email. Verifique se o endereço está correto.");
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Recuperar Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={onEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendReset}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
