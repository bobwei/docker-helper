// @flow
import 'dotenv/config';
import R from 'ramda';
import request from 'got';

const { DOCKER_HOST, DOCKER_HELPER_STACK } = R.compose(
  R.evolve({
    DOCKER_HOST: R.when(R.startsWith('unix:'), R.concat(R.__, ':')),
  }),
  R.merge({
    DOCKER_HOST: 'unix:///var/run/docker.sock',
  }),
)(process.env);

Promise.all([
  request.get(`${DOCKER_HOST}/nodes`, {
    query: {
      filters: JSON.stringify({}),
    },
  }),
  request.get(`${DOCKER_HOST}/services`, {
    query: {
      filters: JSON.stringify({
        label: {
          [`com.docker.stack.namespace=${DOCKER_HELPER_STACK}`]: true,
        },
      }),
    },
  }),
])
  .then(R.map(R.compose(res => JSON.parse(res), R.path(['body']))))
  .then(R.adjust(R.map(R.path(['Status', 'Addr'])), 0))
  .then(
    R.adjust(
      R.map(
        R.compose(
          R.map(R.path(['PublishedPort'])),
          R.path(['Endpoint', 'Ports']),
        ),
      ),
      1,
    ),
  )
  .then(R.apply(R.xprod))
  .then(R.map(R.adjust(R.of, 0)))
  .then(R.map(R.apply(R.xprod)))
  .then(R.map(R.map(R.join(':'))))
  .then(R.flatten)
  .then(R.map(R.concat('http://')))
  .then(R.compose(console.log, res => JSON.stringify(res, null, 2)))
  .catch(R.compose(console.log, R.toString));
