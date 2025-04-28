const admin = require('../config/firebaseAdmin');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'E-mail e senha são obrigatórios.' });
    }

    // Realizar o login com email e senha usando Firebase Admin SDK
    const userRecord = await admin.auth().getUserByEmail(email);
    // Dados do usuário
    const userData = {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || null,
      photoURL: userRecord.photoURL || null,
      emailVerified: userRecord.emailVerified,
    };

    console.log('Dados do usuário após login:', userData);
    return res.status(200).send({ message: 'Login bem-sucedido!', ...userData });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = loginUser;

