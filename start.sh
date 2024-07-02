source .env.sh

if [ "$1" == "dev" ]; then
  echo "Iniciando em modo de desenvolvimento..."
  npm run dev
else
  echo "Iniciando em modo de produção..."
  npm start
fi
