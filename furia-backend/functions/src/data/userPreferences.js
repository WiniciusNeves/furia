const functions = require('firebase-functions');
const admin = require('../config/firebaseAdmin');

exports.salvarEBuscarPreferenciasFuria = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Verifica o método HTTP da requisição
  if (request.method === 'POST') {
    // Função para salvar preferências
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
      return response.status(400).send('O ID do usuário é obrigatório.');
    }

    try {
      const userPreferences = {
        jogadorFavorito: jogadorFavorito || null,
        mapaFavorito: mapaFavorito || null,
        armaFavorita: armaFavorita || null,
        modoDeJogo: modoDeJogo || null, // Ex: Solo, Dupla, Squad
        tipoDeJogador: tipoDeJogador || null, // Ex: Profissional, Casual
        jogadorAntigoFavorito: jogadorAntigoFavorito || null, // Ex: Joga de modo antigo
        jogarComTime: jogarComTime || null, // Ex: Se gosta de jogar com time
        timeFavorito: timeFavorito || null, // Ex: FURIA, INTZ, etc
        updatedAt: Date.now()
      };

      const db = admin.firestore();
      await db.collection('userPreferences').doc(userId).set(userPreferences, { merge: true });

      response.json({ message: 'Preferências salvas com sucesso!' });

    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      response.status(500).json({ error: `Erro interno ao salvar preferências: ${error.message}` });
    }
  } 
  else if (request.method === 'GET') {
    // Função para buscar preferências
    const userId = request.query.userId;

    if (!userId) {
      return response.status(400).send('O ID do usuário é obrigatório como parâmetro de consulta (userId).');
    }

    try {
      const db = admin.firestore();
      const doc = await db.collection('userPreferences').doc(userId).get();

      if (doc.exists) {
        response.json(doc.data());
      } else {
        response.status(404).json({ message: 'Preferências do usuário não encontradas.' });
      }
    } catch (error) {
      console.error('Erro ao buscar preferências:', error);
      response.status(500).json({ error: `Erro interno ao buscar preferências: ${error.message}` });
    }
  } 
  else {
    return response.status(405).send('Método não permitido. Use GET ou POST.');
  }
});


