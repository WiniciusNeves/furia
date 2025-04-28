const admin = require('../config/firebaseAdmin');
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
  try {
    const { email, password, displayName, photoBase64 } = req.body;

    // Verificação de campos obrigatórios
    if (!email || !password || !displayName) {
      return res.status(400).send({ error: 'Email, senha e nome são obrigatórios.' });
    }

    // Criação do usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    console.log(`Usuário criado com sucesso: ${userRecord.uid}`);

    let profileImageUrl = null;

    // Upload da imagem de perfil no Firebase Storage, se fornecido
    if (photoBase64) {
      const bucket = admin.storage().bucket(); // Certificando que está acessando o bucket correto

      if (!bucket) {
        return res.status(500).send({ error: 'Erro ao acessar o Firebase Storage.' });
      }

      const fileName = `users/${userRecord.uid}/${uuidv4()}.jpg`; // Nome do arquivo único
      const file = bucket.file(fileName);
      const buffer = Buffer.from(photoBase64, 'base64');

      // Salvar o arquivo no Firebase Storage
      await file.save(buffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });

      // Gerar URL de acesso ao arquivo
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      console.log(`Imagem de perfil carregada: ${url}`);
      profileImageUrl = url; // URL da imagem no Firebase Storage
    }

    // Gravar o displayName e a URL da foto no Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      displayName: displayName,
      photoURL: profileImageUrl,
    });

    console.log('Dados do usuário gravados no Firestore.');

    // Gerar token de autenticação do usuário
    const token = await admin.auth().createCustomToken(userRecord.uid);

    // Resposta de sucesso
    return res.status(201).send({
      message: 'Usuário registrado com sucesso!',
      uid: userRecord.uid,
      displayName: userRecord.displayName,
      photoURL: profileImageUrl,
      token: token, // Token de autenticação do usuário
    });

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = registerUser;
