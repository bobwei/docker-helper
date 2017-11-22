import R from 'ramda';

/**
 * @param [node, service]
 */
const fn = R.compose(
  R.map(R.compose(R.concat('http://'), R.join(':'))),
  R.converge(R.xprod, [
    R.compose(
      R.filter(R.compose(R.not, R.anyPass([R.isNil, R.isEmpty]))),
      R.of,
      R.path(['Status', 'Addr']),
      R.nth(0),
    ),
    R.compose(
      R.map(R.prop('PublishedPort')),
      R.path(['Endpoint', 'Ports']),
      R.nth(1),
    ),
  ]),
);

export default fn;
