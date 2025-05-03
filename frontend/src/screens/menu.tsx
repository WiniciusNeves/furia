import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { getAuth, signOut } from 'firebase/auth';

const PainelControle = () => {
    const navigation = useNavigation();
    const auth = getAuth();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.reset({
                index: 0,
                routes: [{ name: 'auth' }], // Redefine o histórico para a tela 'auth'
            });
        } catch (error: any) {
            Alert.alert('Erro ao sair', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Header title="Painel de Controle" showProfile showSearch />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                    <Text style={styles.logoutX}>✕</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AlterarDados')}
                >
                    <Text style={styles.buttonText}>Alterar dados pessoais</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Alert.alert('Ativação', 'Funcionalidade em desenvolvimento.')}
                >
                    <Text style={styles.buttonText}>Ativar notificações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Politica')}
                >
                    <Text style={styles.buttonText}>Termos de uso, política de privacidade</Text>
                </TouchableOpacity>
            </View>

            <BottomMenu />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    headerArea: {
        backgroundColor: '#0D0D0D',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#222',
    },
    logoutButton: {
        backgroundColor: '#B10000',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 6,
    },
    logoutX: {
        color: '#fff',
        fontSize: 16,
    },
    content: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 24,
        gap: 16,
        marginTop: 16,
    },
    button: {
        backgroundColor: '#DA8A24',
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
});


export default PainelControle;

