
# 🤖 Chatbot FURIA App

Este projeto consiste em um aplicativo móvel desenvolvido com React Native, que incorpora funcionalidades de interação automatizada por meio de um chatbot temático da organização FURIA, amplamente reconhecida no cenário de e-sports. A solução adota a infraestrutura do Firebase para prover autenticação, persistência de dados e execução de funções serverless. O agente conversacional é capaz de compreender e responder a indagações relativas a atualizações de notícias, calendário de partidas, configurações personalizadas e informações de perfil do usuário autenticado. O backend é integralmente construído com Firebase Functions e o banco de dados em nuvem Firestore, promovendo escalabilidade e integração nativa com os serviços Google Cloud.

---

## 📱 Tecnologias Utilizadas

### Frontend
- React Native (com Expo)
- Firebase Auth
- Fetch API para comunicação HTTP
- Componentes personalizados (Header, BottomMenu)

### Backend
- Firebase Cloud Functions
- Firebase Auth (para autenticação de usuários)
- Firestore (para armazenar dados como notícias, jogos e preferências)

---

## ⚙️ Funcionalidades

### Chatbot
- Envia perguntas para o backend via Cloud Function
- Recebe e exibe respostas do bot
- Armazena histórico da conversa localmente

### Tipos de Pergunta Reconhecidos
- `notícia`, `noticias`, `news`: mostra as últimas notícias
- `tabela`, `jogo`, `partida`: mostra próximos jogos da FURIA
- `preferência`, `configuração`: exibe as preferências do usuário autenticado
- `usuário`, `perfil`, `profile`: mostra o perfil do usuário

---

## 🔐 Autenticação

- Utiliza Firebase Authentication
- O `userId` é extraído do `ID Token` JWT fornecido pelo Firebase
- Esse token é passado no header `Authorization` para a função em nuvem
- O backend valida esse token para obter o UID real do usuário

---

## 🧹 Estrutura do Projeto

### Frontend (React Native)

```
/src
  /components
    Header.js
    BottomMenu.js
  /screens
    Chatbot.js
  /styles
    chatbot.js
firebase.js
.env
```

### Backend (Firebase Functions)

```
/functions
  /config
    firebaseAdmin.js
  chatbot.js
```

---

## 🌐 Comunicação Frontend ↔ Backend

### Envio de mensagem para o bot (exemplo)

```js
const user = auth.currentUser;
const idToken = await user.getIdToken();

await fetch(CHATBOT_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`
  },
  body: JSON.stringify({ pergunta: input })
});
```

### Backend (Cloud Function)

```js
const idToken = request.headers.authorization?.split('Bearer ')[1];
const decoded = await admin.auth().verifyIdToken(idToken);
const userId = decoded.uid;
```

---

## 🔥 Firebase Firestore Estrutura

```
/news
  - {id}
    - titulo: string
    - link: string
    - data: timestamp

/games
  - {id}
    - data: string
    - horario: string
    - adversario: string
    - campeonato: string
    - local: string

/userPreferences
  - {uid}
    - jogadorFavorito: string
    - mapaFavorito: string
    - armaFavorita: string
```

---

## ✨ Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/WiniciusNeves/furia
cd furia
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

```env
CHATBOT_URL=https://SEU_ENDPOINT.cloudfunctions.net/chatbot
```

### 4. Inicie o app

```bash
npx expo start
```

---

## ☁️ Deploy do Backend

```bash
cd functions
firebase deploy --only functions
```

---

## 🛡️ Segurança

- O backend valida o token JWT com `admin.auth().verifyIdToken()`
- Usuários sem token ou com token inválido recebem erro `401 Unauthorized`
- As preferências e perfil são acessados apenas com autenticação válida

---

## 👨‍💼 Autor

Desenvolvido por [Seu Nome].  
Entre em contato: [winiciusneves2004@hotmail.com](mailto:winiciusneves2004@hotmail.com)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
