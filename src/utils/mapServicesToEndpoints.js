import R from 'ramda';

const fn = R.map(
  R.compose(
    R.applySpec({
      name: R.prop('name'),
      endpoints: R.compose(
        R.map(R.compose(R.concat('http://'), R.join(':'))),
        R.converge(R.xprod, [R.compose(R.of, R.prop('ip')), R.prop('ports')]),
      ),
    }),
    R.applySpec({
      ip: R.nth(0),
      name: R.compose(R.path(['Spec', 'Name']), R.nth(1)),
      ports: R.compose(
        R.map(R.prop('PublishedPort')),
        R.path(['Endpoint', 'Ports']),
        R.nth(1),
      ),
    }),
  ),
);

export default fn;
