#!/bin/bash ver o user por Id

echo "Digite o ID do usuário que deseja consultar:"
read userId

curl -X GET http://localhost:3000/users/$userId
