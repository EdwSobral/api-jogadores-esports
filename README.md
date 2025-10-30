# API de Jogadores de eSportes

API RESTful desenvolvida em Node.js para gerenciamento de jogadores de eSportes, com operações CRUD completas e busca por nome.

## 🚀 Tecnologias

- Node.js
- Express.js
- UUID (geração de IDs únicos)
- Dotenv (variáveis de ambiente)

## 📋 Características

- ✅ Operações CRUD completas
- ✅ Busca por nome de jogador (parcial e case-insensitive)
- ✅ Arquitetura em camadas (MVC)
- ✅ Programação assíncrona com async/await
- ✅ Tratamento centralizado de exceções em 3 níveis
- ✅ Validação de dados robusta
- ✅ Mensagens de erro descritivas
- ✅ Banco de dados em memória (simulação com Map)

## 📁 Estrutura do Projeto

```
api-jogadores-esports/
├── src/
│   ├── config/
│   │   └── database.js          # Simulação de banco de dados
│   ├── models/
│   │   └── jogadorModel.js      # Lógica de negócio e validações
│   ├── controllers/
│   │   └── jogadorController.js # Controladores das rotas
│   ├── routes/
│   │   └── jogadorRoutes.js     # Definição das rotas
│   ├── middlewares/
│   │   └── errorHandler.js      # Tratamento de erros
│   └── app.js                   # Configuração do Express
├── server.js                    # Inicialização do servidor
├── testes.http                  # Testes completos (REST Client)
├── demo.http                    # Testes para demonstração
├── package.json
├── .env
└── README.md
```

## 🔧 Instalação

### Pré-requisitos
- Node.js (v16 ou superior)
- VS Code (recomendado)
- REST Client (extensão do VS Code)

### Passos:

1. Clone o repositório ou extraia os arquivos

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (arquivo `.env` já está configurado)

4. Inicie o servidor:
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

5. O servidor estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### Estrutura de Dados do Jogador
```json
{
  "codigo_jogador": "uuid-gerado-automaticamente",
  "nome_jogador": "Nome do Jogador",
  "habilidade_principal": "Habilidade",
  "criado_em": "2025-10-30T...",
  "atualizado_em": "2025-10-30T..." // (apenas em updates)
}
```

### 1. **Criar Jogador**
- **Método:** POST
- **Rota:** `/api/jogadores`
- **Body:**
```json
{
  "nome_jogador": "Faker",
  "habilidade_principal": "Mid Lane"
}
```
- **Validações:**
  - nome_jogador: obrigatório, mínimo 3 caracteres, máximo 100 caracteres
  - habilidade_principal: obrigatório, não vazio
- **Resposta (201):**
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

### 2. **Listar Todos os Jogadores**
- **Método:** GET
- **Rota:** `/api/jogadores`
- **Resposta (200):**
```json
{
  "sucesso": true,
  "quantidade": 4,
  "dados": [...]
}
```

### 3. **Buscar Jogador por Código**
- **Método:** GET
- **Rota:** `/api/jogadores/:codigo`
- **Exemplo:** `/api/jogadores/a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- **Resposta (200):**
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

### 4. **Buscar Jogadores por Nome** (Funcionalidade Especial)
- **Método:** GET
- **Rota:** `/api/jogadores/buscar?nome={nome}`
- **Características:**
  - Busca parcial (não precisa ser nome completo)
  - Case-insensitive (maiúsculas/minúsculas não importam)
  - Busca no campo nome_jogador e habilidade_principal
- **Exemplos:** 
  - `/api/jogadores/buscar?nome=Faker` → Busca exata
  - `/api/jogadores/buscar?nome=Mid` → Encontra todos com "Mid Lane"
  - `/api/jogadores/buscar?nome=uzi` → Encontra "Uzi" (case-insensitive)
- **Resposta (200):**
```json
{
  "sucesso": true,
  "quantidade": 2,
  "dados": [...]
}
```

### 5. **Atualizar Jogador**
- **Método:** PUT
- **Rota:** `/api/jogadores/:codigo`
- **Body:**
```json
{
  "nome_jogador": "Faker Pro",
  "habilidade_principal": "Mid Lane Expert"
}
```
- **Resposta (200):**
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

### 6. **Remover Jogador**
- **Método:** DELETE
- **Rota:** `/api/jogadores/:codigo`
- **Resposta (200):**
```json
{
  "sucesso": true,
  "mensagem": "Jogador removido com sucesso"
}
```

## 🧪 Testando a API

### Opção 1: REST Client (Recomendado)

A forma mais prática de testar é usando a extensão **REST Client** do VS Code.

#### Instalação:
1. Abra o VS Code
2. Vá em Extensions (Ctrl + Shift + X)
3. Busque por "REST Client"
4. Instale a extensão de Huachao Mao

#### Arquivos de Teste:

O projeto inclui dois arquivos `.http` para facilitar os testes:

**`testes.http` - Testes Completos (17 requests)**
- Todos os cenários de CRUD
- Testes de validação
- Testes de erro (400, 404)
- Use este arquivo para testar tudo antes da apresentação

**`demo.http` - Demonstração (9 requests)**
- Requests principais e mais importantes
- Fluxo simplificado para apresentações
- Comentários explicativos
- Use este arquivo durante a apresentação

#### Como usar:

1. Certifique-se que o servidor está rodando (`npm start`)
2. Abra o arquivo `testes.http` ou `demo.http`
3. Clique em **"Send Request"** que aparece acima de cada request
4. A resposta aparecerá em uma nova aba ao lado

#### Exemplo prático:

```http
### Criar Jogador
POST http://localhost:3000/api/jogadores
Content-Type: application/json

{
  "nome_jogador": "Faker",
  "habilidade_principal": "Mid Lane"
}
```

Clique em "Send Request" acima do POST e veja a resposta!

### Opção 2: cURL (Terminal)

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
curl -X PUT http://localhost:3000/api/jogadores/{codigo_jogador} \
  -H "Content-Type: application/json" \
  -d '{"nome_jogador":"Faker Pro","habilidade_principal":"Mid Expert"}'
```

**Remover:**
```bash
curl -X DELETE http://localhost:3000/api/jogadores/{codigo_jogador}
```

### Opção 3: Postman ou Insomnia

1. Importe a coleção ou crie manualmente as requisições
2. Configure a URL base: `http://localhost:3000`
3. Teste cada endpoint conforme documentado

### Opção 4: Navegador (apenas GET)

Abra o navegador e acesse:
- `http://localhost:3000` → Documentação
- `http://localhost:3000/api/jogadores` → Listar todos
- `http://localhost:3000/api/jogadores/buscar?nome=Faker` → Buscar

## 🛡️ Tratamento de Erros

A API possui tratamento centralizado de erros com mensagens descritivas:

### Status Codes:
- **200 OK**: Operação bem-sucedida (GET, PUT, DELETE)
- **201 Created**: Recurso criado com sucesso (POST)
- **400 Bad Request**: Dados inválidos ou requisição malformada
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

### Exemplos de Erros:

**Validação (400):**
```json
{
  "sucesso": false,
  "tipo": "Erro de Validação",
  "mensagem": "Dados inválidos: O nome deve ter pelo menos 3 caracteres"
}
```

**Não Encontrado (404):**
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

## 🎯 Conceitos Técnicos Aplicados

### 1. Arquitetura em Camadas (MVC adaptado)
- **Model**: Lógica de negócio e validações
- **Controller**: Controle de fluxo e respostas HTTP
- **Routes**: Definição de endpoints
- **Middleware**: Tratamento centralizado de erros

### 2. Programação Assíncrona
- Uso de `async/await` em todas as operações
- Promises para simular operações de I/O
- Event loop não-bloqueante do Node.js

### 3. Tratamento de Exceções (3 níveis)
- **Model**: Valida dados e lança erros específicos
- **Controller**: Captura com try-catch e passa para middleware
- **Middleware**: Analisa erro e retorna status HTTP apropriado

### 4. Estrutura de Dados
- Map para armazenamento O(1) em buscas por chave
- UUID v4 para geração de identificadores únicos
- Timestamps ISO 8601 para rastreabilidade

### 5. Validações
- Validação de tipos (typeof)
- Validação de tamanho (length)
- Validação de obrigatoriedade
- Sanitização de dados (trim)

### 6. Boas Práticas
- Separação de responsabilidades
- Código autodocumentado
- Mensagens de erro descritivas
- Logs informativos
- Middleware de tratamento de erros
- Graceful shutdown

## 🎓 Arquitetura Explicada

### Fluxo de uma Requisição:

```
Cliente HTTP
    ↓
Express (app.js)
    ↓
Middleware: express.json() → Converte body em JSON
    ↓
Middleware: Logger → Registra no console
    ↓
Routes (jogadorRoutes.js) → Identifica rota
    ↓
Controller (jogadorController.js) → Extrai dados da requisição
    ↓
Model (jogadorModel.js) → Valida e aplica regras de negócio
    ↓
Database (database.js) → Persiste/busca dados
    ↓
Model → Retorna dados processados
    ↓
Controller → Formata resposta HTTP
    ↓
Middleware: errorHandler (se houver erro) → Trata e formata erro
    ↓
Cliente HTTP ← Recebe resposta JSON
```

### Por que separar em camadas?

1. **Manutenibilidade**: Sei exatamente onde está cada funcionalidade
2. **Testabilidade**: Posso testar cada camada isoladamente
3. **Reusabilidade**: Model pode ser usado em GraphQL, CLI, Workers
4. **Escalabilidade**: Fácil adicionar cache, queue, logging
5. **Colaboração**: Múltiplos desenvolvedores sem conflitos

## 💡 Diferencial: Map vs Array

Escolhi **Map** ao invés de **Array** porque:

| Operação | Array | Map |
|----------|-------|-----|
| Buscar por ID | O(n) - linear | O(1) - constante |
| Inserir | O(1) | O(1) |
| Deletar | O(n) | O(1) |
| Verificar existência | O(n) | O(1) |

Com 1000 jogadores:
- Array: precisa percorrer até 1000 elementos
- Map: acesso direto (hash table)

## 📝 Observações Importantes

### Limitações do Banco em Memória:
- ⚠️ Dados são perdidos ao reiniciar o servidor
- ⚠️ Não há persistência entre sessões
- ⚠️ Limitado pela memória RAM disponível
- ⚠️ Sem suporte a transações

### Migração para Banco Real:

Para produção, basta substituir `database.js` por um ORM:

**PostgreSQL com Sequelize:**
```javascript
const jogador = await Jogador.findByPk(codigo);
```

**MongoDB com Mongoose:**
```javascript
const jogador = await Jogador.findById(codigo);
```

Os **Models e Controllers não precisam mudar** - essa é a vantagem da arquitetura em camadas!

## 🚀 Melhorias Futuras

Para um ambiente de produção, consideraria:

1. **Banco de Dados Real**: PostgreSQL, MongoDB ou MySQL
2. **Autenticação**: JWT para proteger endpoints
3. **Autorização**: Controle de permissões por usuário
4. **Paginação**: Limitar resultados em listagens
5. **Rate Limiting**: Prevenir abuso da API
6. **CORS**: Permitir consumo por frontends
7. **Logging Avançado**: Winston ou Pino
8. **Testes Automatizados**: Jest ou Mocha
9. **Documentação Interativa**: Swagger/OpenAPI
10. **Cache**: Redis para consultas frequentes
11. **CI/CD**: GitHub Actions ou GitLab CI
12. **Containerização**: Docker e Docker Compose
13. **Monitoramento**: Prometheus e Grafana
14. **Validação de Schema**: Joi ou Yup

## 👨‍💻 Eduardo SObral

Desenvolvido para a disciplina de Programação Server-Side - N2
Engenharia de Software - 3º Semestre
Católica SC

## 📄 Licença

Este projeto é livre para uso educacional.