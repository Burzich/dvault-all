#!/bin/bash

CERT_DIR="./cert_postgresql"
CERT_FILES=("ca-postgresql.crt" "postgresql-server.crt" "postgresql-server.key")
CONTAINER_NAME="postgres"
CERT_PATH="/etc/ssl/certs"
KEY_PATH="/etc/ssl/private"
PGDATA_PATH="/var/lib/postgresql/data"


copy_certs_to_container() {
  for file in "${CERT_FILES[@]}"; do
      docker cp "$CERT_DIR/$file" "$CONTAINER_NAME:$CERT_PATH/$file"
  done
}

set_permissions() {
  docker exec $CONTAINER_NAME bash -c "chown postgres:postgres $CERT_PATH/postgresql-server.key"
  docker exec $CONTAINER_NAME bash -c "chown postgres:postgres $CERT_PATH/postgresql-server.crt"
  docker exec $CONTAINER_NAME bash -c "chown postgres:postgres $CERT_PATH/ca-postgresql.crt"

  docker exec $CONTAINER_NAME bash -c "chmod 600 $CERT_PATH/postgresql-server.key"
  docker exec $CONTAINER_NAME bash -c "chmod 644 $CERT_PATH/postgresql-server.crt"
  docker exec $CONTAINER_NAME bash -c "chmod 600 $CERT_PATH/ca-postgresql.crt"

  #docker exec $CONTAINER_NAME bash -c "chmod 700 $CERT_PATH"
  docker exec $CONTAINER_NAME bash -c "ls -la $CERT_PATH"
}

enable_ssl_in_postgresql() {
  docker exec $CONTAINER_NAME bash -c "echo \"ssl = on\" >> $PGDATA_PATH/postgresql.conf"
  sleep 1
  docker exec $CONTAINER_NAME bash -c "echo \"ssl_ca_file = '/etc/ssl/certs/ca-postgresql.crt'\" >> $PGDATA_PATH/postgresql.conf"
  sleep 1
  docker exec $CONTAINER_NAME bash -c "echo \"ssl_cert_file = '/etc/ssl/certs/postgresql-server.crt'\" >> $PGDATA_PATH/postgresql.conf"
  sleep 1
  docker exec $CONTAINER_NAME bash -c "echo \"ssl_key_file = '/etc/ssl/certs/postgresql-server.key'\" >> $PGDATA_PATH/postgresql.conf"
  sleep 1


#  docker exec $CONTAINER_NAME bash -c \"echo \"ssl_cert_file = '$CERT_PATH/postgresql-server.crt'\" >> $PGDATA_PATH/postgresql.conf\"
#  docker exec $CONTAINER_NAME bash -c \"echo \"ssl_key_file = '$KEY_PATH/postgresql-server.key'\" >> $PGDATA_PATH/postgresql.conf\"

  docker exec $CONTAINER_NAME bash -c "echo \"hostssl all all 0.0.0.0/0 cert\" >> $PGDATA_PATH/pg_hba.conf"
  sleep 1
}

restart_container() {
  sleep 3
  docker restart $CONTAINER_NAME
}

check_ssl_status() {
  echo "Проверка статуса SSL в PostgreSQL..."
  docker exec -it $CONTAINER_NAME psql -U postgres -c "SHOW ssl;"
}

echo "Копирование сертификатов в контейнер PostgreSQL..."
copy_certs_to_container

echo "Установка правильных прав на ключи..."
set_permissions

echo "Включение SSL в конфигурации PostgreSQL..."
enable_ssl_in_postgresql

echo "Перезапуск контейнера..."
restart_container

echo "Проверка статуса SSL..."
check_ssl_status

echo "Скрипт завершён. Сертификаты обновлены, контейнер перезапущен и SSL включён."
