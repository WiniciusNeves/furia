# Fúria Backend

Este é o backend do projeto **Fúria**, desenvolvido utilizando o **Firebase** como backend completo para autenticação, banco de dados, armazenamento e funções serverless. Este projeto foi criado para gerenciar funcionalidades como autenticação de usuários, upload de imagens, gerenciamento de notícias e muito mais.



## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **Firebase**:
  - **Firebase Authentication**: Gerenciamento de autenticação de usuários.
  - **Firestore**: Banco de dados NoSQL para armazenamento de dados.
  - **Firebase Storage**: Armazenamento de arquivos, como imagens de perfil.
  - **Firebase Functions**: Funções serverless para lógica de backend.
- **Express.js**: Framework para criação de APIs REST.
- **UUID**: Geração de identificadores únicos para arquivos e outros recursos.

## 📂 Estrutura do Projeto

```plaintext
furia-backend/
├── functions/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── login.js             # Função de login de usuários
│   │   │   ├── user.js              # Função de registro de usuários
│   │   ├── data/
│   │   │   ├── news.js              # Funções para gerenciamento de notícias
│   │   ├── config/
│   │   │   ├── firebaseAdmin.js     # Configuração do Firebase Admin SDK
│   ├── package.json                 # Dependências e scripts do projeto
│   ├── firebase.json                # Configuração do Firebase
│   ├── index.js                     # Ponto de entrada do projeto
├── README.md                        # Documentação do projeto
├── .gitignore                       # Arquivo para ignorar arquivos desnecessários
├── .firebaserc                      # Configuração do Firebase
├── .firebaserc.local                # Configuração do Firebase para ambiente local
├── .firebaserc.staging              # Configuração do Firebase para ambiente de staging

````

### 🚀 Funcionalidades

1. **Autenticação de Usuários**
- Registro de usuários com email, senha, nome e foto de perfil.
   - Login de usuários utilizando email e senha.
   - Gerenciamento de tokens de autenticação.

2. **Gerenciamento de Notícias**

    - Adicionar notícias com título, link e data.
   - Listar todas as notícias ordenadas por data.

3. **Upload de Imagens**
    - Upload de imagens de perfil para o Firebase Storage.
   - Geração de URLs públicas para acesso às imagens.



## 📦 Instalação e Configuração

#### Pré-requisitos

- Node.js instalado na máquina.
- Conta no Firebase com um projeto configurado.
- Firebase CLI instalado globalmente.

### Passos para Configuração

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositório>
   ````

2. **Instale as dependências:**
    ```bash
   cd furia-backend
    npm install
   ````
3. Configure o Firebase:
    ```bash
   firebase init
   ````
- Escolha as opções:
  
   - Functions: Para usar o Firebase Functions.

   - Firestore: Para usar o Firestore como banco de dados.

   - Storage: Para armazenar imagens.
   
4. **Configure o Firebase Admin SDK:**

    - Baixe a chave de serviço do Firebase no console do Firebase.

    - Salve o arquivo JSON na pasta config/ e renomeie para serviceAccountKey.json.

    - Atualize o arquivo firebaseAdmin.js com a configuração correta.


### 🏃‍♂️ Como Executar

#### Localmente

Inicie o servidor local:

```bash 
firebase emulators:start
````
**Acesse as funções localmente:**
```bash
http://localhost:5001/<seu-projeto>/us-central1/<nome-da-funcao>
````
## Deploy no Firebase

Faça o deploy das funções:

```bash
firebase deploy --only functions
```
As funções estarão disponíveis na URL:
```bash
https://<seu-projeto>.cloudfunctions.net/<nome-da-funcao>
```

### 📖 Endpoints Disponíveis

#### Autenticação

- **POST /auth/register**: Registra um novo usuário.  
  Corpo da requisição:

  ```json
  {
    "email": "exemplo@dominio.com",
    "senha": "senha123",
    "nome": "Nome do Usuário",
    "foto": "url_da_imagem"
  }
  ```

- **POST /auth/login**: Faz login de um usuário.  
  Corpo da requisição:
    
  ```json
  {
  "email": "exemplo@dominio.com",
  "senha": "senha123"
  }

  ```

### Gerenciamento de Notícias
- **POST /news**: Adiciona uma nova notícia.  
  Corpo da requisição:

  ```json
  {
  "titulo": "Título da Notícia",
  "link": "https://link-da-noticia.com",
  "data": "2025-04-27"
  }
  ```
- **GET /news: Lista todas as notícias**.


## 🔒 Regras de Segurança do Firestore

Certifique-se de configurar as regras de segurança do Firestore para proteger os dados de forma apropriada.


## 🐛 Problemas Conhecidos

- **Erro 5 NOT_FOUND**: Certifique-se de que a coleção ou bucket do Firebase Storage existe e está configurado corretamente.
- **Permissões do Firestore**: Verifique as regras de segurança para garantir que o acesso está permitido.


## 📄 Licença

Este projeto está licenciado sob a **MIT License**.


## ✨ Contribuições

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir issues ou enviar pull requests.



## 📞 Contato

Autor: **Winicius Neves**  
Email: **Winiciusneves2004@hotmail.com**  
GitHub: **WiniciusNeves**
