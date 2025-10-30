# API de Jogadores de eSportes

Sistema desenvolvido em Node.js para gerenciar informações de jogadores profissionais de eSportes. Implementa operações CRUD completas (Create, Read, Update, Delete) e funcionalidade de busca por nome com filtros avançados.

## Tecnologias Utilizadas

- Node.js (ambiente de execução JavaScript)
- Express (framework web)
- UUID (geração de identificadores únicos)
- Dotenv (gerenciamento de variáveis de ambiente)

## Funcionalidades Principais

O sistema oferece as seguintes funcionalidades:

- Cadastro de novos jogadores com validação de dados
- Listagem completa de jogadores cadastrados
- Busca de jogador específico por código único
- Busca de jogadores por nome (aceita termos parciais e é case-insensitive)
- Atualização de informações dos jogadores
- Remoção de jogadores do sistema
- Tratamento de erros em três níveis diferentes
- Validação rigorosa de todos os dados recebidos
- Mensagens de erro claras e descritivas

## Estrutura do Projeto

O projeto está organizado em camadas seguindo o padrão MVC adaptado:

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

### Descrição das Camadas

**config/database.js** - Simula um banco de dados em memória usando a estrutura Map do JavaScript. Escolhi Map ao invés de Array porque oferece tempo de busca constante O(1) ao invés de linear O(n).

**models/jogadorModel.js** - Contém toda a lógica de negócio da aplicação. Aqui estão implementadas as validações de dados e as regras de como os jogadores devem ser criados, atualizados ou removidos.

**controllers/jogadorController.js** - Responsável por receber as requisições HTTP, extrair os dados necessários, chamar o model apropriado e formatar a resposta que será enviada ao cliente.

**routes/jogadorRoutes.js** - Define todas as rotas (endpoints) disponíveis na API e associa cada uma ao seu respectivo controller.

**middlewares/errorHandler.js** - Centraliza o tratamento de erros da aplicação. Analisa cada erro que ocorre e retorna o status HTTP adequado com mensagens claras.

**app.js** - Configura o Express, registra os middlewares globais e conecta todas as rotas.

**server.js** - Inicializa o servidor HTTP na porta especificada e implementa tratamento de erros não capturados.

## Como Instalar e Executar

Antes de começar, você precisa ter o Node.js instalado (versão 16 ou superior recomendada).

### Passos para instalação:

1. Clone este repositório ou baixe os arquivos
2. Abra o terminal na pasta do projeto
3. Instale as dependências com o comando:
```bash
npm install
```

4. O arquivo .env já está configurado com as variáveis necessárias

5. Inicie o servidor com um dos comandos abaixo:
```bash
npm start
```
ou, se quiser usar o nodemon (reinicia automaticamente ao salvar arquivos):
```bash
npm run dev
```

6. O servidor estará disponível em http://localhost:3000

## Documentação dos Endpoints

Todos os endpoints retornam dados em formato JSON.

### Estrutura de um Jogador

```json
{
  "codigo_jogador": "uuid-unico-gerado-automaticamente",
  "nome_jogador": "Nome Completo do Jogador",
  "habilidade_principal": "Posição ou Habilidade",
  "criado_em": "2025-10-30T15:30:00.000Z",
  "atualizado_em": "2025-10-30T16:00:00.000Z"
}
```

### Criar Novo Jogador

**Endpoint:** POST /api/jogadores

**Corpo da Requisição:**
```json
{
  "nome_jogador": "Faker",
  "habilidade_principal": "Mid Lane"
}
```

**Regras de Validação:**
- nome_jogador: campo obrigatório, mínimo 3 caracteres, máximo 100 caracteres
- habilidade_principal: campo obrigatório, não pode ser vazio

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
    { jogador 1 },
    { jogador 2 },
    { jogador 3 },
    { jogador 4 }
  ]
}
```

### Buscar Jogador por Código

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

Esta é uma funcionalidade especial que implementei. A busca funciona de forma inteligente:
- Aceita termos parciais (buscar "Fak" encontra "Faker")
- Não diferencia maiúsculas de minúsculas (buscar "uzi" encontra "Uzi")
- Busca tanto no nome quanto na habilidade do jogador

**Exemplos:**
- GET /api/jogadores/buscar?nome=Faker (busca exata)
- GET /api/jogadores/buscar?nome=Mid (encontra todos com "Mid Lane")
- GET /api/jogadores/buscar?nome=uzi (encontra "Uzi" mesmo em minúsculo)

**Resposta (Status 200):**
```json
{
  "sucesso": true,
  "quantidade": 2,
  "dados": [
    { jogador que corresponde à busca },
    { outro jogador que corresponde }
  ]
}
```

### Atualizar Jogador

**Endpoint:** PUT /api/jogadores/:codigo

**Corpo da Requisição:**
```json
{
  "nome_jogador": "Faker Pro",
  "habilidade_principal": "Mid Lane Expert"
}
```

As mesmas validações do cadastro são aplicadas na atualização.

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

Implementei duas formas principais de testar: usando a extensão REST Client do VS Code ou usando ferramentas como cURL, Postman ou Insomnia.

### Opção 1: REST Client (Recomendado)

Esta é a forma mais prática que encontrei para testar APIs durante o desenvolvimento.

**Instalação:**
1. Abra o VS Code
2. Vá em Extensions (Ctrl + Shift + X)
3. Procure por "REST Client"
4. Instale a extensão do Huachao Mao

**Arquivos de Teste Incluídos:**

O projeto já vem com dois arquivos prontos para teste:

**testes.http** - Contém 17 requisições cobrindo todos os cenários possíveis. Use este arquivo para testar tudo antes de apresentar o projeto. Ele inclui testes de CRUD completo, validações e casos de erro.

**demo.http** - Versão simplificada com 9 requisições essenciais. Este arquivo foi pensado para demonstrações e apresentações, pois tem um fluxo mais limpo e direto.

**Como usar:**
1. Certifique-se que o servidor está rodando (npm start)
2. Abra qualquer um dos arquivos .http no VS Code
3. Você verá "Send Request" aparecer acima de cada requisição
4. Clique em "Send Request" para executar
5. A resposta aparece automaticamente em uma nova aba

### Opção 2: cURL (Linha de Comando)

Se preferir usar o terminal, aqui estão exemplos de comandos:

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

### Opção 3: Postman ou Insomnia

Você pode importar as requisições ou criar manualmente. A base URL é http://localhost:3000

### Opção 4: Navegador

Para requisições GET, você pode simplesmente abrir o navegador:
- http://localhost:3000 (documentação da API)
- http://localhost:3000/api/jogadores (lista todos)
- http://localhost:3000/api/jogadores/buscar?nome=Faker (busca)

## Tratamento de Erros

Implementei um sistema de tratamento de erros em três níveis, cada um com sua responsabilidade específica.

### Status HTTP Utilizados:

**200 OK** - Requisição processada com sucesso (GET, PUT, DELETE bem-sucedidos)

**201 Created** - Novo recurso criado com sucesso (POST)

**400 Bad Request** - Dados enviados são inválidos ou está faltando alguma informação obrigatória

**404 Not Found** - O recurso solicitado não existe no sistema

**500 Internal Server Error** - Erro inesperado no servidor

### Exemplos de Respostas de Erro:

**Erro de Validação (400):**
```json
{
  "sucesso": false,
  "tipo": "Erro de Validação",
  "mensagem": "Dados inválidos: O nome deve ter pelo menos 3 caracteres"
}
```

**Recurso Não Encontrado (404):**
```json
{
  "sucesso": false,
  "tipo": "Não Encontrado",
  "mensagem": "Nenhum jogador encontrado com esse código"
}
```

**Rota Inexistente (404):**
```json
{
  "sucesso": false,
  "tipo": "Rota Não Encontrada",
  "mensagem": "A rota GET /api/jogador não existe nesta API",
  "dica": "Verifique a documentação para ver as rotas disponíveis"
}
```

## Decisões Técnicas e Arquitetura

### Por que separei o código em camadas?

Optei por separar a aplicação em camadas (Model, Controller, Routes, Middleware) seguindo o princípio de Separação de Responsabilidades. Cada camada tem uma função específica:

A camada de **Model** cuida exclusivamente da lógica de negócio. Aqui estão as validações, regras e a comunicação com o banco de dados. Se eu precisar mudar uma regra de validação, sei exatamente onde está.

A camada de **Controller** lida apenas com a parte HTTP da aplicação. Ela recebe requisições, extrai os dados necessários, chama o model apropriado e formata as respostas. Não tem lógica de negócio aqui.

A camada de **Routes** apenas mapeia URLs para controllers. É fácil ver todas as rotas disponíveis olhando este arquivo.

O **Middleware** centraliza o tratamento de erros. Ao invés de repetir código de tratamento de erro em cada controller, trato tudo em um único lugar.

Essa separação facilita manutenção, testes e permite escalar o projeto facilmente. Se amanhã eu quiser adicionar GraphQL, posso reutilizar todo o Model sem modificações.

### Por que escolhi Map ao invés de Array?

Para o banco de dados em memória, escolhi usar a estrutura Map do JavaScript ao invés de um Array simples por questões de performance.

Com Array, para buscar um jogador por código eu precisaria percorrer todo o array até encontrar (complexidade O(n)). Com 1000 jogadores, poderia ter que verificar os 1000.

Com Map, o acesso é direto por chave com complexidade O(1). Não importa se tenho 10 ou 10.000 jogadores, a busca é instantânea.

Além disso, Map oferece métodos nativos como has(), delete() e get() que facilitam muito as operações CRUD.

### Como implementei o assincronismo?

Usei async/await em todas as operações porque Node.js é single-threaded. Se eu fizesse operações síncronas, cada requisição bloquearia o servidor inteiro até terminar.

Com async/await, quando uma operação está aguardando (por exemplo, buscando no banco de dados), o Event Loop do Node libera a thread para processar outras requisições. Isso permite que o servidor atenda centenas de requisições simultaneamente mesmo sendo single-threaded.

Usei Promises com setTimeout para simular a latência que existiria em um banco de dados real. Em produção, essas Promises seriam as chamadas reais ao PostgreSQL, MongoDB ou outro banco.

### Sistema de tratamento de erros em três níveis

Implementei o tratamento de erros pensando em três momentos diferentes:

**Nível 1 - Model:** Aqui acontecem as validações de negócio. Se o nome é muito curto, se falta algum campo obrigatório, etc. O Model lança erros específicos com mensagens claras.

**Nível 2 - Controller:** Todo controller envolve suas operações em try-catch. Se qualquer erro acontecer (do Model, do banco, ou inesperado), o catch captura e passa para o próximo nível usando next(erro).

**Nível 3 - Middleware:** O middleware errorHandler analisa o erro recebido e decide qual status HTTP retornar. Erros de validação viram 400, recursos não encontrados viram 404, erros inesperados viram 500. As mensagens são formatadas de forma consistente.

Essa arquitetura garante que nenhum erro quebre o servidor e que o cliente sempre receba uma resposta adequada.

## Limitações e Considerações

### Sobre o Banco de Dados em Memória

Escolhi implementar um banco de dados em memória para este projeto acadêmico. Isso significa que:

- Os dados são perdidos quando o servidor é reiniciado
- Não há persistência entre sessões
- A capacidade é limitada pela memória RAM disponível
- Não há suporte a transações ou relacionamentos complexos

Para um ambiente de produção, este banco seria substituído por PostgreSQL, MySQL ou MongoDB. A vantagem da arquitetura em camadas é que apenas o arquivo database.js precisaria ser modificado, mantendo todo o resto do código intacto.

### Segurança

Este é um projeto educacional e não implementa camadas de segurança necessárias para produção, como:
- Autenticação de usuários
- Autorização baseada em papéis
- Rate limiting para prevenir abuso
- Sanitização avançada de inputs
- HTTPS


## Autor: Eduardo SObral

Projeto desenvolvido como trabalho avaliativo N2 da disciplina de Programação Server-Side.
Curso de Engenharia de Software - 3º Semestre
Católica de Santa Catarina

Desenvolvido por Eduardo F. Silva em outubro de 2025.

## Licença

Este projeto foi desenvolvido para fins educacionais e está disponível para uso acadêmico.