# Analisador Jurídico IA

Projeto fullstack (Backend + Frontend) para fazer upload de documentos jurídicos, gerar relatórios via IA e permitir interação com os resultados.

## Estrutura principal
- backend/ — API Node.js + TypeORM (TypeScript)
- frontend/ — SPA React + Vite (TypeScript)
- storage/ — armazenamento local (fallback)

## Funcionalidades
- Registro / Login (JWT)  
- Upload de PDFs (S3 ou local) — [upload route](backend/src/routes/upload.ts)  
- Análise dos documentos com OpenAI → geração de relatório — [analyze route](backend/src/routes/analyze.ts)  
- Histórico de interações com relatório — [interact route](backend/src/routes/interact.ts)  
- Painel admin com estatísticas por organização — [admin route](backend/src/routes/admin.ts)

## Requisitos
- Node.js 18+
- PostgreSQL
- Conta AWS S3 (bucket configurado) — para armazenamento de documentos
- Chave OpenAI

## Variáveis de ambiente (exemplos)
Backend: [backend/.env](backend/.env)
- OPENAI_API_KEY
- DATABASE_URL (ex: postgres://user:pass@host:5432/db)
- JWT_SECRET
- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET_NAME

Frontend: [frontend/.env](frontend/.env)
- VITE_API_URL=http://localhost:3000

## Como rodar

1. Instalar dependências
- Backend:
```sh
  cd backend
  npm install
```  
- Frontend:
```sh
  cd frontend
  npm install
```
  
2. Configurar .env (veja backend/.env e frontend/.env)

3. Banco de dados / migrations (backend)

- Executar migrations:
```sh
  cd backend
  npm run migrate
```
(ou usar npm run typeorm -- migration:run 
conforme script em backend/package.json)

4.Iniciar backend:
 ```sh
  cd backend
  npm run dev
  ```

5. Iniciar frontend:
 ```sh
   cd frontend
   npm run dev
 ```

## Endpoints principais
- POST /register — registrar usuário (auth route)
- POST /login — login retorna token JWT (auth route)
- POST /upload — upload de arquivos (rota protegida) (upload route)
- GET /processes — lista processos do usuário (processes route)
- POST /analyze/:processId — inicia análise (OpenAI) (analyze route)
- GET /report/:processId — obter relatório por processo (report route)
- POST /interact/:reportId — perguntar ao relatório (gera Interaction) (interact route)
- GET /admin/stats — estatísticas (somente admin) (admin route)

## Observações importantes
- Uploads usam S3 por padrão via uploadS3 middleware. Para usar local, ver uploadMiddelware.
- Autenticação no frontend é feita por AuthProvider e usado em App.
- Cliente HTTP frontend está em api.ts e adiciona token automaticamente.
- Modelos OpenAI usados nas rotas: ver analyze.ts e interact.ts. Ajuste model / parâmetros conforme sua conta.

## Scripts úteis
- Backend:
   - npm run dev — dev server
   - npm run migrate — executar migrações
- Frontend:
   - npm run dev — Vite dev server
   - npm run build — build de produção
   
## Ajuda / Debug
- Logs do backend imprimem informações de rota e erros em console (ver backend/src/index.ts)
- Se tiver problemas com S3, verifique credenciais em .env e uploadS3.ts


- Ainda falta muito a ser codado, espero concluir em breve.
- Contribuições e melhorias são bem-vindas.
