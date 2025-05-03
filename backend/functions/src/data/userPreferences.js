const functions = require('firebase-functions');
const admin = require('../config/firebaseAdmin');

exports.salvarEBuscarPreferenciasFuria = functions.https.onRequest(async (request, response) => {
  // Configuração de CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  const db = admin.firestore();

  if (request.method === 'POST' || request.method === 'PUT') {
    // Salvar preferências
    const {
      userId,
      jogadorFavorito,
      mapaFavorito,
      armaFavorita,
      modoDeJogo,
      tipoDeJogador,
      jogadorAntigoFavorito,
      jogarComTime,
      timeFavorito
    } = request.body;

    if (!userId) {
      return response.status(400).json({ error: 'O ID do usuário é obrigatório.' });
    }

    try {
      const userPreferences = {
        jogadorFavorito: jogadorFavorito || null,
        mapaFavorito: mapaFavorito || null,
        armaFavorita: armaFavorita || null,
        modoDeJogo: modoDeJogo || null,
        tipoDeJogador: tipoDeJogador || null,
        jogadorAntigoFavorito: jogadorAntigoFavorito || null,
        jogarComTime: jogarComTime || null,
        timeFavorito: timeFavorito || null,
        updatedAt: Date.now()
      };

      await db.collection('userPreferences').doc(userId).set(userPreferences, { merge: true });

      return response.status(200).json({ message: 'Preferências salvas com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      return response.status(500).json({ error: `Erro interno ao salvar preferências: ${error.message}` });
    }
  }

  else if (request.method === 'GET') {
    // Buscar preferências
    const userId = request.query.userId;

    if (!userId) {
      return response.status(400).json({ error: 'O ID do usuário é obrigatório como parâmetro de consulta (userId).' });
    }

    try {
      const doc = await db.collection('userPreferences').doc(userId).get();

      if (doc.exists) {
        return response.status(200).json(doc.data());
      } else {
        return response.status(404).json({ message: 'Preferências do usuário não encontradas.' });
      }
    } catch (error) {
      console.error('Erro ao buscar preferências:', error);
      return response.status(500).json({ error: `Erro interno ao buscar preferências: ${error.message}` });
    }
  }

  // Método não suportado
  return response.status(405).json({ error: 'Método não permitido. Use GET, POST ou PUT.' });
});
