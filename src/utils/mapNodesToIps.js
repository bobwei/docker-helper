import R from 'ramda';

const fn = R.compose(
  R.filter(R.compose(R.not, R.anyPass([R.isNil, R.isEmpty]))),
  R.map(R.path(['Status', 'Addr'])),
);

export default fn;
