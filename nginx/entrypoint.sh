#!/bin/sh
set -e

NGINX_RESTART_SEC="${NGINX_RESTART_SEC:-20}"

echo "Выполнение пользовательских команд перед запуском Nginx"

if [ -f /docker-entrypoint.sh ]; then
    echo "Оригинальный entrypoint найден, запускаем..."
    /docker-entrypoint.sh "$@" &
    ENTRYPOINT_PID=$!
    while :; do
        sleep $NGINX_RESTART_SEC
        echo "Перезапуск nginx ..."
        nginx -s reload
    done &
    wait $ENTRYPOINT_PID
else
    echo "Оригинальный entrypoint не найден!"
    exit 1
fi