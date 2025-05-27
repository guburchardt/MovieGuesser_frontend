# MovieGuesser

Jogo para adivinhar filmes a partir de posters borrados. A cada tentativa errada, o poster fica mais nítido.

## Instalação

### Frontend
```bash
# Instale as dependências
npm install

# Inicie o servidor
npm start
```

### Backend
```bash
# Crie e ative o ambiente virtual
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Instale as dependências
pip install -r requirements.txt

# Configure a chave da API do TMDB
# Crie um arquivo .env na raiz do projeto com:
TMDB_API_KEY=sua_chave_api_aqui

# Inicie o servidor
python main.py
```

## Como Jogar

1. O jogo começa com o poster do filme borrado
2. Você tem 3 tentativas para adivinhar
3. A cada erro, o poster fica mais nítido
4. Se acertar, você ganha pontos
5. Se errar todas as tentativas, o filme é revelado

## Tecnologias

- Frontend: React, TypeScript, Material UI
- Backend: Python, Flask, TMDB API 