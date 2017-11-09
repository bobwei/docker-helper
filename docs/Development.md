# Development

## Test with Docker

```
docker run \
  --env-file=.env \
  -v /var/run/docker.sock:/var/run/docker.sock \
  docker-helper
```

## Add secret to your drone

```
drone secret add \
  --repository bob-wei/docker-helper \
  --name docker_username_1 \
  --value YOUR_USERNAME
```

```
drone secret add \
  --repository bob-wei/docker-helper \
  --name docker_password_1 \
  --value YOUR_PASSWORD
```
