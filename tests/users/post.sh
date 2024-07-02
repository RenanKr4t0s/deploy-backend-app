#!/bin/bash

# echo "Digite o ID do usuário:"
# read id

echo "Digite o nome do usuário:"
read name

echo "Digite o telefone do usuário:"
read phone

echo "Digite as observações:"
read obs

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$name\",\"phone\":\"$phone\",\"obs\":\"$obs\"}" \
  http://localhost:3000/users

# \"id\":\"$id\",