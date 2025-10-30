# API de Jogadores de eSportes

Sistema desenvolvido em Node.js para gerenciamento de informacoes de jogadores profissionais de eSportes. Implementa operacoes CRUD completas (Create, Read, Update, Delete) e funcionalidade de busca por nome com filtros avancados.

## Tecnologias Utilizadas

- Node.js (ambiente de execucao JavaScript)
- Express (framework web)
- UUID (geracao de identificadores unicos)
- Dotenv (gerenciamento de variaveis de ambiente)

## Funcionalidades Principais

O sistema oferece as seguintes funcionalidades:

- Cadastro de novos jogadores com validacao de dados
- Listagem completa de jogadores cadastrados
- Busca de jogador especifico por codigo unico
- Busca de jogadores por nome (aceita termos parciais e e case-insensitive)
- Atualizacao de informacoes dos jogadores
- Remocao de jogadores do sistema
- Tratamento de erros em tres niveis diferentes
- Validacao rigorosa de todos os dados recebidos
- Mensagens de erro claras e descritivas

## Estrutura do Projeto

O projeto esta organizado em camadas seguindo o padrao MVC adaptado:

```
api-jogadores-esports/
├── src/
│   ├── config/
│   │   └── database.js          
│   ├── models/
│   │   └── jogadorModel.js      
│   ├── controllers/
│   │   └── jogadorController.js 
│   ├── routes/
│   │   └── jogadorRoutes.js     
│   ├── middlewares/
│   │   └── errorHandler.js      
│   └── app.js                   
├── server.js                    
├── testes.http                  
├── demo.http                    
├── package.json
├── .env
├── .gitignore
└── README.md
```

### Descricao das Camadas

**config/database.js** - Simula um banco de dados em memoria usando a estrutura Map do JavaScript. Escolhi Map ao inves de Array porque oferece tempo de busca constante O(1) ao inves de linear O(n).

**models/jogadorModel.js** - Contem toda a logica de negocio da aplicacao. Aqui estao implementadas as validacoes de dados e as regras de como os jogadores devem ser criados, atualizados ou removidos.

**controllers/jogadorController.js** - Responsavel por receber as requisicoes HTTP, extrair os dados necessarios, chamar o model apropriado e formatar a resposta que sera enviada ao cliente.

**routes/jogadorRoutes.js** - Define todas as rotas (endpoints) disponiveis na API e associa cada uma ao seu respectivo controller.

**middlewares/errorHandler.js** - Centraliza o tratamento de erros da aplicacao. Analisa cada erro que ocorre e retorna o status HTTP adequado com mensagens claras.

**app.js** - Configura o Express, registra os middlewares globais e conecta todas as rotas.

**server.js** - Inicializa o servidor HTTP na porta especificada e implementa tratamento de erros nao capturados.

## Como Instalar e Executar

Antes de comecar, voce precisa ter o Node.js instalado (versao 16 ou superior recomendada).

### Passos para instalacao:

1. Clone este repositorio ou baixe os arquivos
2. Abra o terminal na pasta do projeto
3. Instale as dependencias com o comando:
```bash
npm install
```

4. O arquivo .env ja esta configurado com as variaveis necessarias

5. Inicie o servidor com um dos comandos abaixo:
```bash
npm start
```
ou, se quiser usar o nodemon (reinicia automaticamente ao salvar arquivos):
```bash
npm run dev
```

6. O servidor estara disponivel em http://localhost:3000

## Documentacao dos Endpoints

Todos os endpoints retornam dados em formato JSON.

### Estrutura de um Jogador

```json
{
  "codigo_jogador": "uuid-unico-gerado-automaticamente",
  "nome_jogador": "Nome Completo do Jogador",
  "habilidade_principal": "Posicao ou Habilidade",
  "criado_em": "2025-10-30T15:30:00.000Z",
  "atualizado_em": "2025-10-30T16:00:00.000Z"
}
```

### Criar Novo Jogador

**Endpoint:** POST /api/jogadores

**Corpo da Requisicao:**
```json
{
  "nome_jogador": "Faker",
  "habilidade_principal": "Mid Lane"
}
```

**Regras de Validacao:**
- nome_jogador: campo obrigatorio, minimo 3 caracteres, maximo 100 caracteres
- habilidade_principal: campo obrigatorio, nao pode ser vazio

**Resposta de Sucesso (Status 201):**
```json
{
  "sucesso": true,
  "mensagem": "Jogador criado com sucesso",
  "dados": {
    "codigo_jogador": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "nome_jogador": "Faker",
    "habilidade_principal": "Mid Lane",
    "criado_em": "2025-10-30T15:30:00.000Z"
  }
}
```

### Listar Todos os Jogadores

**Endpoint:** GET /api/jogadores

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "quantidade": 4,
  "dados": [
    { "jogador": 1 },
    { "jogador": 2 },
    { "jogador": 3 },
    { "jogador": 4 }
  ]
}
```

### Buscar Jogador por Codigo

**Endpoint:** GET /api/jogadores/:codigo

**Exemplo:** GET /api/jogadores/a1b2c3d4-e5f6-7890-abcd-ef1234567890

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "dados": {
    "codigo_jogador": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "nome_jogador": "Faker",
    "habilidade_principal": "Mid Lane",
    "criado_em": "2025-10-30T15:30:00.000Z"
  }
}
```

### Buscar Jogadores por Nome

**Endpoint:** GET /api/jogadores/buscar?nome={termo}

Esta e uma funcionalidade especial que implementei. A busca funciona de forma inteligente:
- Aceita termos parciais (buscar "Fak" encontra "Faker")
- Nao diferencia maiusculas de minusculas (buscar "uzi" encontra "Uzi")
- Busca tanto no nome quanto na habilidade do jogador

**Exemplos:**
- GET /api/jogadores/buscar?nome=Faker (busca exata)
- GET /api/jogadores/buscar?nome=Mid (encontra todos com "Mid Lane")
- GET /api/jogadores/buscar?nome=uzi (encontra "Uzi" mesmo em minusculo)

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "quantidade": 2,
  "dados": [
    { "jogador": "correspondente" },
    { "outro": "jogador" }
  ]
}
```

### Atualizar Jogador

**Endpoint:** PUT /api/jogadores/:codigo

**Corpo da Requisicao:**
```json
{
  "nome_jogador": "Faker Pro",
  "habilidade_principal": "Mid Lane Expert"
}
```

As mesmas validacoes do cadastro sao aplicadas na atualizacao.

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "mensagem": "Jogador atualizado com sucesso",
  "dados": {
    "codigo_jogador": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "nome_jogador": "Faker Pro",
    "habilidade_principal": "Mid Lane Expert",
    "atualizado_em": "2025-10-30T16:00:00.000Z"
  }
}
```

### Remover Jogador

**Endpoint:** DELETE /api/jogadores/:codigo

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "mensagem": "Jogador removido com sucesso"
}
```

## Como Testar a API

Implementei duas formas principais de testar: usando a extensao REST Client do VS Code ou usando ferramentas como cURL, Postman ou Insomnia.

### Opcao 1: REST Client (Recomendado)

Esta e a forma mais pratica que encontrei para testar APIs durante o desenvolvimento.

**Instalacao:**
1. Abra o VS Code
2. Va em Extensions (Ctrl + Shift + X)
3. Procure por "REST Client"
4. Instale a extensao do Huachao Mao

**Arquivos de Teste Incluidos:**

O projeto ja vem com dois arquivos prontos para teste:

**testes.http** - Contem 17 requisicoes cobrindo todos os cenarios possiveis. Use este arquivo para testar tudo antes de apresentar o projeto. Ele inclui testes de CRUD completo, validacoes e casos de erro.

**demo.http** - Versao simplificada com 9 requisicoes essenciais. Este arquivo foi pensado para demonstracoes e apresentacoes, pois tem um fluxo mais limpo e direto.

**Como usar:**
1. Certifique-se que o servidor esta rodando (npm start)
2. Abra qualquer um dos arquivos .http no VS Code
3. Voce vera "Send Request" aparecer acima de cada requisicao
4. Clique em "Send Request" para executar
5. A resposta aparece automaticamente em uma nova aba

### Opcao 2: cURL (Linha de Comando)

Se preferir usar o terminal, aqui estao exemplos de comandos:

**Criar jogador:**
```bash
curl -X POST http://localhost:3000/api/jogadores \
  -H "Content-Type: application/json" \
  -d '{"nome_jogador":"Faker","habilidade_principal":"Mid Lane"}'
```

**Listar todos:**
```bash
curl http://localhost:3000/api/jogadores
```

**Buscar por nome:**
```bash
curl "http://localhost:3000/api/jogadores/buscar?nome=Faker"
```

**Atualizar:**
```bash
curl -X PUT http://localhost:3000/api/jogadores/codigo-do-jogador \
  -H "Content-Type: application/json" \
  -d '{"nome_jogador":"Faker Pro","habilidade_principal":"Mid Expert"}'
```

**Remover:**
```bash
curl -X DELETE http://localhost:3000/api/jogadores/codigo-do-jogador
```

### Opcao 3: Postman ou Insomnia

Voce pode importar as requisicoes ou criar manualmente. A base URL e http://localhost:3000

### Opcao 4: Navegador

Para requisicoes GET, voce pode simplesmente abrir o navegador:
- http://localhost:3000 (documentacao da API)
- http://localhost:3000/api/jogadores (lista todos)
- http://localhost:3000/api/jogadores/buscar?nome=Faker (busca)

## Tratamento de Erros

Implementei um sistema de tratamento de erros em tres niveis, cada um com sua responsabilidade especifica.

### Status HTTP Utilizados:

**200 OK** - Requisicao processada com sucesso (GET, PUT, DELETE bem-sucedidos)

**201 Created** - Novo recurso criado com sucesso (POST)

**400 Bad Request** - Dados enviados sao invalidos ou esta faltando alguma informacao obrigatoria

**404 Not Found** - O recurso solicitado nao existe no sistema

**500 Internal Server Error** - Erro inesperado no servidor

### Exemplos de Respostas de Erro:

**Erro de Validacao (400):**
```json
{
  "sucesso": false,
  "tipo": "Erro de Validacao",
  "mensagem": "Dados invalidos: O nome deve ter pelo menos 3 caracteres"
}
```

**Recurso Nao Encontrado (404):**
```json
{
  "sucesso": false,
  "tipo": "Nao Encontrado",
  "mensagem": "Nenhum jogador encontrado com esse codigo"
}
```

**Rota Inexistente (404):**
```json
{
  "sucesso": false,
  "tipo": "Rota Nao Encontrada",
  "mensagem": "A rota GET /api/jogador nao existe nesta API",
  "dica": "Verifique a documentacao para ver as rotas disponiveis"
}
```

## Decisoes Tecnicas e Arquitetura

### Por que separei o codigo em camadas?

Optei por separar a aplicacao em camadas (Model, Controller, Routes, Middleware) seguindo o principio de Separacao de Responsabilidades. Cada camada tem uma funcao especifica:

A camada de **Model** cuida exclusivamente da logica de negocio. Aqui estao as validacoes, regras e a comunicacao com o banco de dados. Se eu precisar mudar uma regra de validacao, sei exatamente onde esta.

A camada de **Controller** lida apenas com a parte HTTP da aplicacao. Ela recebe requisicoes, extrai os dados necessarios, chama o model apropriado e formata as respostas. Nao tem logica de negocio aqui.

A camada de **Routes** apenas mapeia URLs para controllers. E facil ver todas as rotas disponiveis olhando este arquivo.

O **Middleware** centraliza o tratamento de erros. Ao inves de repetir codigo de tratamento de erro em cada controller, trato tudo em um unico lugar.

Essa separacao facilita manutencao, testes e permite escalar o projeto facilmente. Se amanha eu quiser adicionar GraphQL, posso reutilizar todo o Model sem modificacoes.

### Por que escolhi Map ao inves de Array?

Para o banco de dados em memoria, escolhi usar a estrutura Map do JavaScript ao inves de um Array simples por questoes de performance.

Com Array, para buscar um jogador por codigo eu precisaria percorrer todo o array ate encontrar (complexidade O(n)). Com 1000 jogadores, poderia ter que verificar os 1000.

Com Map, o acesso e direto por chave com complexidade O(1). Nao importa se tenho 10 ou 10.000 jogadores, a busca e instantanea.

Alem disso, Map oferece metodos nativos como has(), delete() e get() que facilitam muito as operacoes CRUD.

### Como implementei o assincronismo?

Usei async/await em todas as operacoes porque Node.js e single-threaded. Se eu fizesse operacoes sincronas, cada requisicao bloquearia o servidor inteiro ate terminar.

Com async/await, quando uma operacao esta aguardando (por exemplo, buscando no banco de dados), o Event Loop do Node libera a thread para processar outras requisicoes. Isso permite que o servidor atenda centenas de requisicoes simultaneamente mesmo sendo single-threaded.

Usei Promises com setTimeout para simular a latencia que existiria em um banco de dados real. Em producao, essas Promises seriam as chamadas reais ao PostgreSQL, MongoDB ou outro banco.

### Sistema de tratamento de erros em tres niveis

Implementei o tratamento de erros pensando em tres momentos diferentes:

**Nivel 1 - Model:** Aqui acontecem as validacoes de negocio. Se o nome e muito curto, se falta algum campo obrigatorio, etc. O Model lanca erros especificos com mensagens claras.

**Nivel 2 - Controller:** Todo controller envolve suas operacoes em try-catch. Se qualquer erro acontecer (do Model, do banco, ou inesperado), o catch captura e passa para o proximo nivel usando next(erro).

**Nivel 3 - Middleware:** O middleware errorHandler analisa o erro recebido e decide qual status HTTP retornar. Erros de validacao viram 400, recursos nao encontrados viram 404, erros inesperados viram 500. As mensagens sao formatadas de forma consistente.

Essa arquitetura garante que nenhum erro quebre o servidor e que o cliente sempre receba uma resposta adequada.

## Limitacoes e Consideracoes

### Sobre o Banco de Dados em Memoria

Escolhi implementar um banco de dados em memoria para este projeto academico. Isso significa que:

- Os dados sao perdidos quando o servidor e reiniciado
- Nao ha persistencia entre sessoes
- A capacidade e limitada pela memoria RAM disponivel
- Nao ha suporte a transacoes ou relacionamentos complexos

Para um ambiente de producao, este banco seria substituido por PostgreSQL, MySQL ou MongoDB. A vantagem da arquitetura em camadas e que apenas o arquivo database.js precisaria ser modificado, mantendo todo o resto do codigo intacto.

### Seguranca

Este e um projeto educacional e nao implementa camadas de seguranca necessarias para producao, como:
- Autenticacao de usuarios
- Autorizacao baseada em papeis
- Rate limiting para prevenir abuso
- Sanitizacao avancada de inputs
- HTTPS

## Autor: Eduardo Sobral

Projeto desenvolvido como trabalho avaliativo N2 da disciplina de Programacao Server-Side.
Curso de Engenharia de Software - 3 Semestre
Catolica de Santa Catarina

Desenvolvido por Eduardo F. Silva em outubro de 2025.

## Licenca

Este projeto foi desenvolvido para fins educacionais e esta disponivel para uso academico.