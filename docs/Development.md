# Development

## Test with Docker

```
docker run \
  --env-file=.env \
  -v /var/run/docker.sock:/var/run/docker.sock \
  docker-helper
```
