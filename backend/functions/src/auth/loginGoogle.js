const admin = require('../config/firebaseAdmin');

const loginGoogle = async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).send({ error: 'Email e ID do Google são obrigatórios.' });
    }

    let userRecord;
    try {
      // Tenta buscar o usuário pelo email
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await admin.auth().createUser({
          email,
          displayName: name,
          photoURL: picture,
          password: googleId, 
        });
        console.log(`Usuário criado via Google: ${userRecord.uid}`);
      } else {
        throw error;
      }
    }

    // Atualiza foto e nome se mudou
    await admin.auth().updateUser(userRecord.uid, {
      displayName: name,
      photoURL: picture,
    });

    // Gera um token customizado
    const token = await admin.auth().createCustomToken(userRecord.uid);

    return res.status(200).send({
      message: 'Login/Registro com Google bem-sucedido!',
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      token,
    });

  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = loginGoogle;
