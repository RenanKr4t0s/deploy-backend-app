#!/bin/bash

# Carregar variáveis de ambiente do arquivo env.sh
if [ -f ./env.sh ]; then
    source ./env.sh
    echo "Variáveis de ambiente importadas com sucesso"
else
    echo "Arquivo env.sh não encontrado. Certifique-se de que o arquivo existe no mesmo diretório que migration.sh."
    exit 1
fi

# Verificar se as variáveis de ambiente estão definidas
if [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_NAME" ]; then
    echo "As variáveis de ambiente DB_USER, DB_PASSWORD e DB_NAME devem estar definidas."
    exit 1
fi

# Criar a database se ela não existir
mysql -u$DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Garantir que a tabela __migrations__ exista
mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "
CREATE TABLE IF NOT EXISTS __migrations__ (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"

# Função para verificar se a migração já foi executada
check_migration() {
    local migration_file=$1
    local result=$(mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -sse "SELECT COUNT(*) FROM __migrations__ WHERE filename='$migration_file';")
    if [ "$result" -eq 0 ]; then
        return 0 # Migração não foi executada
    else
        return 1 # Migração já foi executada
    fi
}

# Função para executar a migração
run_migration() {
    local migration_file=$1
    local migration_path="./migrations/$migration_file"
    mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME < $migration_path
    if [ $? -eq 0 ]; then
        echo "Migração $migration_file executada com sucesso."
        # Registrar migração na tabela __migrations__
        mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME -e "INSERT INTO __migrations__ (filename) VALUES ('$migration_file');"
    else
        echo "Erro ao executar a migração $migration_file."
    fi
}

# Iterar sobre todos os arquivos SQL na pasta migrations e executar as migrações não executadas
for migration_file in $(ls ./migrations/*.sql); do
    migration_file=$(basename "$migration_file")
    check_migration $migration_file
    if [ $? -eq 0 ]; then
        run_migration $migration_file
    else
        echo "Migração $migration_file já foi executada anteriormente. Ignorando."
    fi
done
