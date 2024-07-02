#!/bin/bash deletando users

echo "Digite o ID do usuário que deseja deletar:"
read userId

curl -X DELETE http://localhost:3000/users/$userId
