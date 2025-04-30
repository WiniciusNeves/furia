import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import styles from '../styles/home';
import { NEWS_API_URL } from '@env';
import NewsAddModal from '../components/NewsAddModal';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  interface NewsItem {
    titulo: string;
    link: string;
    data: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const getNews = async () => {
      if (!NEWS_API_URL) {
        console.error('URL da API de notícias não definida.');
        return;
      }

      try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
          console.error('Erro ao buscar notícias');
          return;
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
      }
    };

    getNews();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Noticias" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>notícias e atualizações</Text>

        {news.length === 0 ? (
          <Text style={styles.emptyText}>Ainda não tem nada ainda</Text>
        ) : (
          news.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => {
                // Abre o link no navegador externo
                Linking.openURL(item.link);
              }}
            >
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardDate}>{item.data}</Text>
            </TouchableOpacity>
          ))
        )}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Nova Notícia</Text>
        </TouchableOpacity>

        <NewsAddModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      </ScrollView>

      <BottomMenu />
    </View>
  );
};

export default Home;

