# dvault-front

Step with caddy

```
docker build -t dvault_front:v1.0 --build-arg REACT_APP_API_BASE_URL=$API_BASE_URL .
```

```
docker run --name dvault_front -p 80:80 -d --network docker_network  --env REACT_APP_API_BASE_URL=$API_BASE_URL -d dvault_front:v1.0
```
