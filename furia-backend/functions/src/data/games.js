const { FieldValue } = require('firebase-admin/firestore');
const admin = require("../config/firebaseAdmin");

const db = admin.firestore();
const GAMES_COLLECTION = 'games';

const salvarOuListarJogos = async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  try {
    if (request.method === 'POST') {
      const { adversario, data, horario, local, campeonato } = request.body;

      if (!adversario || !data || !horario || !local || !campeonato) {
        response.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
      }

      const novoJogo = {
        adversario,
        data,
        horario,
        local,
        campeonato,
        createdAt: FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection(GAMES_COLLECTION).add(novoJogo);

      response.status(201).json({
        message: 'Jogo adicionado com sucesso!',
        id: docRef.id,
        jogo: novoJogo,
      });
    } else if (request.method === 'GET') {
      const snapshot = await db.collection(GAMES_COLLECTION).orderBy('data', 'asc').get();

      if (snapshot.empty) {
        response.status(200).json([]);
        return;
      }

      const jogos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      response.status(200).json(jogos);
    } else {
      response.status(405).json({ error: 'Método não permitido.' });
    }
  } catch (error) {
    response.status(500).json({ error: `Erro interno: ${error.message}` });
  }
};

module.exports = salvarOuListarJogos;
