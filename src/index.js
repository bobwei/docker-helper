// @flow
import 'dotenv/config';
import R from 'ramda';
import request from 'got';

import mapNodesToIps from './utils/mapNodesToIps';

const { DOCKER_HOST, DOCKER_HELPER_STACK } = R.compose(
  R.evolve({
    DOCKER_HOST: R.when(R.startsWith('unix:'), R.concat(R.__, ':')),
  }),
  R.merge({
    DOCKER_HOST: 'unix:///var/run/docker.sock',
  }),
)(process.env);
const info = {
  message: 'You are running with following context:',
  context: { DOCKER_HOST, DOCKER_HELPER_STACK },
};
const log = R.tap(
  R.compose(console.log, data => JSON.stringify(data, null, 2)),
);

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
  .then(R.adjust(mapNodesToIps, 0))
  .then(
    R.adjust(
      R.map(
        R.compose(
          R.map(R.pick(['PublishedPort'])),
          R.path(['Endpoint', 'Ports']),
        ),
      ),
      1,
    ),
  )
  .then(R.apply(R.xprod))
  .then(R.map(R.adjust(R.of, 0)))
  .then(R.map(R.apply(R.xprod)))
  .then(
    R.map(
      R.map(([ip, { PublishedPort }]) => ({
        baseUrl: `http://${ip}:${PublishedPort}`,
      })),
    ),
  )
  .then(R.flatten)
  .then(R.compose(log, R.merge(info), R.objOf('endpoints')))
  .catch(R.compose(log, R.merge(info), R.objOf('error'), R.toString));
