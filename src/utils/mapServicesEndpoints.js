import R from 'ramda';

import mapEndpoints from './mapEndpoints';

/**
 * @param [node, service]
 */
const fn = R.applySpec({
  service: R.compose(R.path(['Spec', 'Name']), R.nth(1)),
  endpoints: mapEndpoints,
});

export default fn;
