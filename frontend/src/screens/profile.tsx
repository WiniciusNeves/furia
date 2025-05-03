import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PREFERENCES_URL } from '@env';
import { Feather } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import styles from '../styles/profile';
import BottomMenu from '@/components/BottomMenu';

interface Preferences {
    jogarComTime: boolean;
    modoDeJogo?: string;
    tipoDeJogador?: string;
    mapaFavorito?: string;
    jogadorFavorito?: string;
    armaFavorita?: string;
    jogadorAntigoFavorito?: string;
    timeFavorito?: string;
    titulo?: string;
}

const ProfileScreen = () => {
    const [preferences, setPreferences] = useState<Preferences>({} as Preferences);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (currentUser) {
                    setUserName(currentUser.displayName || 'Sem nome');
                }

                const uid = await AsyncStorage.getItem('uid');

                if (!uid) {
                    console.warn('UID não encontrado no AsyncStorage');
                    return;
                }

                const res = await fetch(`${USER_PREFERENCES_URL}?userId=${uid}`);

                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error(`Resposta inesperada do servidor: ${text}`);
                }

                const data = await res.json();

                if (!res.ok) {
                    console.log('Erro ao buscar preferências:', data);
                    return;
                }

                setPreferences(data);
                setTitle(data?.titulo || '');
            } catch (err: any) {
                console.error('Erro ao buscar dados:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (key: keyof Preferences, value: string | boolean) => {
        setPreferences((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const uid = await AsyncStorage.getItem('uid');
            if (!uid) {
                console.warn('UID não encontrado no AsyncStorage no momento do salvar');
                return;
            }

            const payload = {
                userId: uid,
                ...preferences,
                titulo: title,
            };

            const res = await fetch(USER_PREFERENCES_URL, {
                method: 'PUT', // ou POST, dependendo da lógica do seu backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error('Erro ao salvar preferências:', result);
                throw new Error(result?.message || 'Erro desconhecido');
            }

            console.log('Preferências salvas com sucesso:', result.message);
            setEditing(false);
        } catch (err: any) {
            console.log('Erro ao salvar preferências:', err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C18624" />
            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 20 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Topo do perfil */}
                <View style={styles.header}>
                    <Image
                        source={preferences.avatar ? { uri: preferences.avatar } : require('../assets/images/avatar.png')}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.nickname}>{userName}</Text>

                    </View>
                    <TouchableOpacity style={styles.editIcon} onPress={() => setEditing(!editing)}>
                        <Feather name={editing ? 'check' : 'edit'} size={20} color="#C18624" />
                    </TouchableOpacity>
                </View>

                {/* Preferências */}
                {[
                    { label: 'Modo de Jogo', key: 'modoDeJogo' },
                    { label: 'Posição Favorita', key: 'tipoDeJogador' },
                    { label: 'Mapa Favorito', key: 'mapaFavorito' },
                    { label: 'Jogador Favorito', key: 'jogadorFavorito' },
                    { label: 'Arma Favorita', key: 'armaFavorita' },
                    { label: 'Jogador Antigo Favorito', key: 'jogadorAntigoFavorito' },
                    { label: 'Time Favorito', key: 'timeFavorito' },
                ].map(({ label, key }) => (
                    <View style={styles.card} key={key}>
                        <Text style={styles.label}>{label}</Text>
                        {editing ? (
                            <TextInput
                                style={styles.inputInline}
                                value={preferences[key] || ''}
                                onChangeText={(value) => handleChange(key as keyof Preferences, value)}
                                placeholder={`Digite ${label.toLowerCase()}`}
                                placeholderTextColor={'#C18624'}
                            />
                        ) : (
                            <Text style={styles.value}>{preferences[key] || '-'}</Text>
                        )}
                    </View>
                ))}

                <View style={styles.card}>
                    <Text style={styles.label}>Jogar em Time</Text>
                    {editing ? (
                        <TouchableOpacity onPress={() => handleChange('jogarComTime', !preferences.jogarComTime)}>
                            <Text style={styles.value}>{preferences.jogarComTime ? 'Sim' : 'Não'} (toque para alterar)</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.value}>{preferences.jogarComTime ? 'Sim' : 'Não'}</Text>
                    )}
                </View>

                {editing && (
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar alterações</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            {!editing && <BottomMenu />}
        </View >
    );
};

export default ProfileScreen;


