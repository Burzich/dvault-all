FROM redis:6.2

COPY --chown=redis:redis ./cert_redis/redis-server.crt /etc/redis/redis-server.crt
COPY --chown=redis:redis ./cert_redis/redis-server.key /etc/redis/redis-server.key
COPY --chown=redis:redis ./cert_redis/ca.crt /etc/redis/ca.crt

COPY --chown=redis:redis ./redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379 6380

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
