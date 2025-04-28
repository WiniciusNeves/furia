// news/newsAPI.js
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("../config/firebaseAdmin");

const NEWS_COLLECTION = 'news';
const { FieldValue } = require('firebase-admin/firestore');
const db = admin.firestore();

const isValidUrl = (str) => {
  const pattern = /^(https?:\/\/)[^\s]+$/i;
  return pattern.test(str);
};

const newsAPI = onRequest(async (request, response) => {
  logger.info("Chamada para a função newsAPI", { structuredData: true });

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  try {
    if (request.method === 'GET') {
      logger.info("Método GET detectado");
      const snapshot = await db.collection(NEWS_COLLECTION).orderBy('data', 'desc').get();

      if (snapshot.empty) {
        response.status(200).json([]);
        return;
      }

      const noticias = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      response.status(200).json(noticias);
    } else if (request.method === 'POST') {
      logger.info("Método POST detectado");
      const { titulo, link, data } = request.body;

      if (!titulo || !link || !data) {
        response.status(400).json({ error: 'Título, link e data são obrigatórios.' });
        return;
      }

      if (!isValidUrl(link)) {
        response.status(400).json({ error: 'O link fornecido é inválido.' });
        return;
      }

      const novaNoticia = {
        titulo,
        link,
        data,
        createdAt: FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection(NEWS_COLLECTION).add(novaNoticia);

      response.status(201).json({
        message: 'Notícia adicionada com sucesso!',
        id: docRef.id,
        noticia: novaNoticia,
      });
    } else {
      response.status(405).json({ error: 'Método não permitido. Use GET ou POST.' });
    }
  } catch (error) {
    logger.error("Erro ao acessar o Firestore:", error);
    response.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

module.exports = newsAPI;

