#!/bin/bash

echo "Digite o ID do usuário que deseja atualizar:"
read userId

echo "Digite o novo nome do usuário:"
read name

echo "Digite o novo telefone do usuário:"
read phone

echo "Digite as novas observações:"
read obs

curl -X PUT \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$name\",\"phone\":\"$phone\",\"obs\":\"$obs\"}" \
  http://localhost:3000/users/$userId
