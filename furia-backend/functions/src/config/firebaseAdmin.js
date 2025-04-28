const admin = require('firebase-admin');
const serviceAccount = require('./service-account-file.json'); // Caminho para o arquivo JSON da chave do Firebase

if (!admin.apps.length) {
  try {
    // Inicializa com as credenciais explícitas
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'chatbot-furia-c1fd2.firebasestorage.app',
    });
    console.log('Admin SDK inicializado com credenciais explícitas.');
  } catch (error) {
    console.error('Erro ao inicializar o Firebase Admin SDK:', error);
  }
} else {
  console.log('Admin SDK já estava inicializado.');
}

module.exports = admin;
