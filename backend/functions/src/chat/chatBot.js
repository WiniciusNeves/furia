const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const admin = require('../config/firebaseAdmin');

const db = admin.firestore();

const chatbot = onRequest(async (request, response) => {
  logger.info("Chamada para a função chatbot", { structuredData: true });

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Método não permitido. Use POST.' });
    return;
  }

  try {
    const { pergunta, userId } = request.body;

    if (!pergunta) {
      response.status(400).json({ error: 'A pergunta é obrigatória.' });
      return;
    }

    logger.info(`Pergunta recebida: ${pergunta}`);

    let botResponse = '';
    const lowerMessage = pergunta.toLowerCase();

    // Notícias
    if (lowerMessage.includes('notícia') || lowerMessage.includes('noticias') || lowerMessage.includes('news')) {
      const snapshot = await db.collection('news').orderBy('data', 'desc').limit(3).get();

      if (snapshot.empty) {
        botResponse = 'Não encontrei notícias recentes.';
      } else {
        botResponse = '📰 Últimas notícias:\n\n';
        snapshot.forEach(doc => {
          const data = doc.data();
          botResponse += `• ${data.titulo}\n🔗 Link: ${data.link}\n\n`;
        });
      }

    }
    // Tabela de jogos
    else if (lowerMessage.includes('tabela') || lowerMessage.includes('jogo') || lowerMessage.includes('partida')) {
      const snapshot = await db.collection('games').orderBy('data', 'asc').limit(5).get();

      if (snapshot.empty) {
        botResponse = 'Não há jogos programados no momento.';
      } else {
        botResponse = '🎮 Próximos jogos:\n\n';
        snapshot.forEach(doc => {
          const data = doc.data();
          botResponse += `• ${data.data} às ${data.horario}: FURIA vs ${data.adversario} (${data.campeonato}) no ${data.local}\n\n`;
        });
      }

    }
    // Preferências do usuário
    else if (lowerMessage.includes('preferência') || lowerMessage.includes('configuração') || lowerMessage.includes('configurar')) {
      if (!userId) {
        botResponse = '❗ O ID do usuário é necessário para buscar as preferências.';
      } else {
        const doc = await db.collection('userPreferences').doc(userId).get();
        if (doc.exists) {
          const preferences = doc.data();
          botResponse = `🔧 Suas preferências:\n`;
          botResponse += `• Jogador favorito: ${preferences.jogadorFavorito || 'N/A'}\n`;
          botResponse += `• Mapa favorito: ${preferences.mapaFavorito || 'N/A'}\n`;
          botResponse += `• Arma favorita: ${preferences.armaFavorita || 'N/A'}\n`;
        } else {
          botResponse = '❌ Preferências não encontradas para este usuário.';
        }
      }

    }
    // Perfil do usuário
    else if (lowerMessage.includes('usuário') || lowerMessage.includes('perfil') || lowerMessage.includes('profile')) {
      if (!userId) {
        botResponse = '❗ O ID do usuário é necessário para buscar o perfil.';
      } else {
        const userRecord = await admin.auth().getUser(userId);
        const doc = await db.collection('userPreferences').doc(userId).get();

        botResponse = `👤 Perfil do usuário:\n`;
        botResponse += `• Nome: ${userRecord.displayName || 'N/A'}\n`;

        if (doc.exists) {
          const userData = doc.data();
          Object.keys(userData).forEach(key => {
            botResponse += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${userData[key] || 'N/A'}\n`;
          });
        } else {
          botResponse += '• Preferências não encontradas.';
        }
      }

    }
    // Comando desconhecido
    else {
      botResponse = '🤖 Desculpe, não entendi.\nVocê pode perguntar sobre:\n- Notícias\n- Tabela de jogos\n- Preferências\n- Perfil do usuário';
    }

    response.status(200).json({ resposta: botResponse });

  } catch (error) {
    logger.error('Erro no chatbot:', error);
    response.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

module.exports = chatbot;
