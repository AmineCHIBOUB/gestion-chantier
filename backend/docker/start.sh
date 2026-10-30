#!/bin/sh
set -e

# Render impose le port d'écoute via la variable PORT
PORT="${PORT:-10000}"
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/:80>/:${PORT}>/" /etc/apache2/sites-available/000-default.conf

# Certificat SSL de la base Aiven, fourni dans la variable DB_SSL_CA
if [ -n "$DB_SSL_CA" ]; then
    printf '%s\n' "$DB_SSL_CA" > /tmp/db-ca.pem
    export MYSQL_ATTR_SSL_CA=/tmp/db-ca.pem
fi

php artisan config:cache
php artisan route:cache
php artisan storage:link || true
php artisan migrate --force --seed

exec apache2-foreground
