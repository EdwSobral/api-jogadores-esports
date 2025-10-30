// server.js
// Arquivo que inicializa o servidor e coloca a API no ar

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Inicio o servidor na porta definida
const server = app.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 Servidor iniciado com sucesso!');
  console.log(`📡 Rodando na porta: ${PORT}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
  console.log('Pressione Ctrl+C para parar o servidor');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (erro) => {
  console.error('❌ Erro não tratado (Promise):', erro.message);
  console.error('Encerrando servidor com segurança...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (erro) => {
  console.error('❌ Exceção não capturada:', erro.message);
  console.error('Encerrando servidor imediatamente...');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM recebido. Encerrando servidor graciosamente...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });
});