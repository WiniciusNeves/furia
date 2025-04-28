const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const registerUser = require("./src/auth/user");
const loginUser = require("./src/auth/login");
const newsAPI = require("./src/data/news");
const userPreferences = require("./src/data/userPreferences");

exports.registerUser = onRequest(async (request, response) => {
  logger.info("Chamada para a função registerUser", { structuredData: true });
  await registerUser(request, response);  // Chama a função de user.js
});

exports.loginUser = onRequest(async (request, response) => {
  logger.info("Chamada para a função loginUser", { structuredData: true });
  await loginUser(request, response);  // Chama a função de login.js
});

exports.newsAPI = onRequest(async (request, response) => {
  logger.info("Chamada para a função newsAPI", { structuredData: true });
  await newsAPI(request, response);  // Chama a função de news.js
});

exports.userPreferences = onRequest(async (request, response) => {
  logger.info("Chamada para a função userPreferences", { structuredData: true });
  await userPreferences.salvarEBuscarPreferenciasFuria(request, response);  // Chama a função de userPreferences.js
});

