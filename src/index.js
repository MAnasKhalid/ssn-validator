
/**
 * See `http://www.irs.gov/Individuals/General-ITIN-Information` for more information.
 *
 * Social Security number (SSN) is a nine-digit number issued to U.S. citizens, permanent residents,
 * and * temporary (working) residents under section 205(c)(2) of the Social Security Act, codified
 * as 42 U.S.C. 405(c)(2).
 */

/**
 * Module dependencies.
 */

import _ from 'lodash';

/**
 * Blacklist.
 */

const blacklist = [
  '078051120',
  '219099999',
  '457555462'
];
const expression = /^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/;

/**
 * Validate function.
 */

function isValid(ssn) {
  if (!expression.test(ssn)) {
    return false;
  }

  return !_.includes(blacklist, ssn);
}

/**
 * Masks the SSN with "X" placeholders to protect sensitive data,
 * while keeping some of the original digits for contextual recognition.
 *
 * E.g. "123456789" -> "XXXXX6789"
 */

export function mask(ssn) {
  if (!isValid(ssn)) {
    throw new Error('Invalid Social Security Number');
  }

  return ssn.substr(0, ssn.length - 4).replace(/[\w]/g, 'X') + ssn.substr(-4);
}

/**
 * Export default.
 */

export { isValid as default };