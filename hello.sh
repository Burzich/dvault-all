#!/bin/bash

if [ ! -d "cert_postgresql" ]; then
  echo "Создание директории cert_postgresql..."
  mkdir cert_postgresql
fi

cd cert_postgresql || exit

echo "Генерация ключа и сертификата CA для PostgreSQL..."
openssl genpkey -algorithm RSA -out ca-postgresql.key
openssl req -x509 -new -nodes -key ca-postgresql.key -days 3650 -out ca-postgresql.crt -subj "/CN=MyPostgresCA"
sleep 1

echo "Генерация ключа и сертификата для PostgreSQL сервера..."
openssl genpkey -algorithm RSA -out postgresql-server.key
openssl req -new -key postgresql-server.key -out postgresql-server.csr -subj "/CN=postgresql-server"
openssl x509 -req -in postgresql-server.csr -CA ca-postgresql.crt -CAkey ca-postgresql.key -CAcreateserial -out postgresql-server.crt -days 365
sleep 1

echo "Генерация ключа и сертификата для PostgreSQL клиента..."
openssl genpkey -algorithm RSA -out postgresql-client.key
openssl req -new -key postgresql-client.key -out postgresql-client.csr -subj "/CN=postgresql-client"
openssl x509 -req -in postgresql-client.csr -CA ca-postgresql.crt -CAkey ca-postgresql.key -CAcreateserial -out postgresql-client.crt -days 365
sleep 1


echo "Изменение прав на сертификаты PostgreSQL..."
#sudo chown root:root ./*
#sudo chmod 600 postgresql-server.key

cd .. || exit

if [ ! -d "cert_redis" ]; then
  echo "Создание директории cert_redis..."
  mkdir -p cert_redis
fi

cd cert_redis || exit

echo "Генерация ключа и сертификата CA для Redis..."
openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -new -nodes -key ca.key -days 3650 -out ca.crt -subj "/CN=MyRedisCA"
sleep 1

echo "Генерация ключа и сертификата для Redis сервера..."
openssl genpkey -algorithm RSA -out redis-server.key
openssl req -new -key redis-server.key -out redis-server.csr -subj "/CN=redis-server"
openssl x509 -req -in redis-server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out redis-server.crt -days 365
sleep 1

echo "Генерация ключа и сертификата для Redis клиента..."
openssl genpkey -algorithm RSA -out redis-client.key
openssl req -new -key redis-client.key -out redis-client.csr -subj "/CN=redis-client"
openssl x509 -req -in redis-client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out redis-client.crt -days 365
sleep 1

echo "Изменение прав на сертификаты Redis..."
#sudo chown root:root ./*

cd .. || exit

echo "Запуск Docker Compose..."
docker compose up -d
sleep 4

echo "Запуск тестового скрипта для PostgreSQL..."
./test_postgresql.sh
