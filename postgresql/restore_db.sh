#!/bin/bash
set -e

psql -U postgres -c "CREATE DATABASE vault;"
psql -U postgres -c "CREATE USER vault_rw WITH PASSWORD 'vault1234';"
pg_restore -U postgres -d vault /vault.dump

psql -U postgres -d vault -c "ALTER SCHEMA public OWNER TO vault_rw;"
psql -U postgres -d vault -c "ALTER TABLE secrets OWNER TO vault_rw;"
psql -U postgres -d vault -c "ALTER TABLE users OWNER TO vault_rw;"

psql -U postgres -d vault -c "REVOKE ALL PRIVILEGES ON DATABASE vault FROM PUBLIC;"
psql -U postgres -d vault -c "REVOKE ALL ON SCHEMA public FROM PUBLIC;"
psql -U postgres -d vault -c "GRANT CONNECT ON DATABASE vault TO vault_rw;"
psql -U postgres -d vault -c "GRANT USAGE ON SCHEMA public TO vault_rw;"
psql -U postgres -d vault -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vault_rw;"
psql -U postgres -d vault -c "REVOKE ALL ON SCHEMA public FROM PUBLIC;"
