import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NEWS_API_URL } from "@env";
import styles from "../styles/modalStyles";

export default function NewsAddModal({ visible, onClose }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");

    const handleAddNews = async () => {
        if (!title || !link || !date) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(NEWS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: title,
                    link,
                    data: date,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar notícia.");
            }

            Alert.alert("Sucesso", "Notícia adicionada com sucesso!");
            setTitle("");
            setLink("");
            setDate("");
            onClose();
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível adicionar a notícia. Tente novamente.");
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Adicionar Notícia</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Link"
                        value={link}
                        onChangeText={setLink}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data (DD/MM/YYYY)"
                        value={date}
                        onChangeText={setDate}
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAddNews}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
