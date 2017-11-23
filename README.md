# docker-helper

A set of useful clis to help managing docker containers.


## getEndpoints

Given a docker stack name, be able to list all service endpoints in the stack.

example .env
```
DOCKER_HELPER_STACK=bobwei_docker-helper
```

result
```
{
  "message": "You are running with following context:",
  "context": {
    "DOCKER_HOST": "unix:///var/run/docker.sock:",
    "DOCKER_HELPER_STACK": "bobwei_docker-helper"
  },
  "endpoints": [
    {
      "service": "bobwei_docker-helper_nginx2",
      "endpoints": [
        "http://192.168.65.2:30002"
      ]
    },
    {
      "service": "bobwei_docker-helper_nginx",
      "endpoints": [
        "http://192.168.65.2:30000",
        "http://192.168.65.2:30001"
      ]
    }
  ]
}
```

# Development

## Test with Docker

```
docker run \
  -e DOCKER_HELPER_STACK=YOUR_STACK \
  -v /var/run/docker.sock:/var/run/docker.sock \
  bobwei/docker-helper
```

## Add secret to your drone

```
drone secret add \
  --repository bob-wei/docker-helper \
  --name docker_username_1 \
  --value $(read -sr input && echo $input)
```

```
drone secret add \
  --repository bob-wei/docker-helper \
  --name docker_password_1 \
  --value $(read -sr input && echo $input)
```
