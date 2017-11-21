import R from 'ramda';

const fn = R.map(R.path(['Status', 'Addr']));

export default fn;
