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
    const { message } = request.body;

    if (!message) {
      response.status(400).json({ error: 'Mensagem é obrigatória.' });
      return;
    }

    logger.info(`Mensagem recebida: ${message}`);

    let botResponse = '';

    // Tratar diferentes tipos de perguntas
    const lowerMessage = message.toLowerCase();

    // Responder sobre notícias
    if (lowerMessage.includes('notícia') || lowerMessage.includes('noticias') || lowerMessage.includes('news')) {
      const snapshot = await db.collection('news').orderBy('data', 'desc').limit(3).get();

      if (snapshot.empty) {
        botResponse = 'Não encontrei notícias recentes.';
      } else {
        botResponse = 'Últimas notícias:\n\n';
        snapshot.forEach(doc => {
          const data = doc.data();
          botResponse += `• ${data.titulo}\n🔗 Link: ${data.link}\n\n`;
        });
      }

    } 
    // Responder sobre tabela de jogos
    else if (lowerMessage.includes('tabela') || lowerMessage.includes('jogo') || lowerMessage.includes('partida')) {
      const snapshot = await db.collection('games').orderBy('data', 'asc').limit(5).get();

      if (snapshot.empty) {
        botResponse = 'Não há jogos programados no momento.';
      } else {
        botResponse = 'Próximos jogos:\n\n';
        snapshot.forEach(doc => {
          const data = doc.data();
          botResponse += `• ${data.data} às ${data.horario}: FURIA vs ${data.adversario} (${data.campeonato}) no ${data.local}\n\n`;
        });
      }

    } 
    // Responder sobre preferências
    else if (lowerMessage.includes('preferência') || lowerMessage.includes('configuração') || lowerMessage.includes('configurar')) {
      const userId = request.body.userId;
      if (!userId) {
        botResponse = 'O ID do usuário é necessário para buscar as preferências.';
      } else {
        const doc = await db.collection('userPreferences').doc(userId).get();
        if (doc.exists) {
          const preferences = doc.data();
          botResponse = `Suas preferências:\nJogador Favorito: ${preferences.jogadorFavorito || 'N/A'}\nMapa Favorito: ${preferences.mapaFavorito || 'N/A'}\nArma Favorita: ${preferences.armaFavorita || 'N/A'}\n`;
        } else {
          botResponse = 'Preferências não encontradas para este usuário.';
        }
      }

    } 
    // Responder sobre perfil de usuário
    else if (lowerMessage.includes('usuario') || lowerMessage.includes('profile')) {
      const userId = request.body.userId;
      if (!userId) {
        botResponse = 'O ID do usuário é necessário para buscar as informações do perfil.';
      } else {
        const userRecord = await admin.auth().getUser(userId);
        const doc = await db.collection('userPreferences').doc(userId).get();
        if (doc.exists) {
          const userData = doc.data();
          botResponse = `Seu perfil de usuário:\nNome: ${userRecord.displayName || 'N/A'}\n`;
          Object.keys(userData).forEach(key => {
            botResponse += `Perfereicas do usuário:\n${key}: ${userData[key] || 'N/A'}\n`;
          });
        } else {
          botResponse = 'Perfil de usuário não encontrado.';
        }
      }

    } 
    // Caso o chatbot não entenda
    else {
      botResponse = 'Desculpe, não entendi. Você pode perguntar sobre "notícias", "tabela de jogos", "preferências" ou "usuário".';
    }

    response.status(200).json({ response: botResponse });

  } catch (error) {
    logger.error('Erro no chatbot:', error);
    response.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

module.exports = chatbot;
