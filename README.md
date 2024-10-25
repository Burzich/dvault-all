# Debichыы - Vault Main

Мы не успели дописать автоматическое создание сертификатов, поэтому создать надо вручную:

Генерация сертификатов 

```bash
cd cert_postgresql
openssl genpkey -algorithm RSA -out ca-postgresql.key
openssl req -x509 -new -nodes -key ca-postgresql.key -days 3650 -out ca-postgresql.crt -subj "/CN=MyPostgresCA"


openssl genpkey -algorithm RSA -out postgresql-server.key
openssl req -new -key postgresql-server.key -out postgresql-server.csr -subj "/CN=postgresql-server"
openssl x509 -req -in postgresql-server.csr -CA ca-postgresql.crt -CAkey ca-postgresql.key -CAcreateserial -out postgresql-server.crt -days 365

openssl genpkey -algorithm RSA -out postgresql-client.key
openssl req -new -key postgresql-client.key -out postgresql-client.csr -subj "/CN=postgresql-client"
openssl x509 -req -in postgresql-client.csr -CA ca-postgresql.crt -CAkey ca-postgresql.key -CAcreateserial -out postgresql-client.crt -days 365
```

```bash
cd ..
sudo chown root:root ./cert_postgresql/*

cd /redis/cert_redis
openssl genpkey -algorithm RSA -out ca.key
openssl req -x509 -new -nodes -key ca.key -days 3650 -out ca.crt -subj "/CN=MyRedisCA"


openssl genpkey -algorithm RSA -out redis-server.key
openssl req -new -key redis-server.key -out redis-server.csr -subj "/CN=redis-server"
openssl x509 -req -in redis-server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out redis-server.crt -days 365

openssl genpkey -algorithm RSA -out redis-client.key
openssl req -new -key redis-client.key -out redis-client.csr -subj "/CN=redis-client"
openssl x509 -req -in redis-client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out redis-client.crt -days 365
```

```bash
sudo chown root:root ./cert_redis/*
```

После поднимаем все сервисы



```bash
docker compose up -d
```


Также, выполним `./test_postgresql.sh` для внесения сертификатов в postgres. 

На выходе получаем готовый backend.
