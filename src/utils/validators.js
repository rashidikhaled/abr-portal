/**
 * Validates an Iranian national code using the official checksum algorithm.
 *
 * @param {string} code
 * @returns {boolean}
 */

export function isValidNationalCode(code) {
  if (!/^\d{10}$/.test(code)) return false;

  // Reject repeated digits (e.g. 1111111111)
  if (/^(\d)\1{9}$/.test(code)) return false;

  const check = Number(code[9]);

  const sum = code
    .slice(0, 9)
    .split("")
    .reduce((acc, digit, index) => acc + Number(digit) * (10 - index), 0);

  const remainder = sum % 11;

  return remainder < 2 ? check === remainder : check === 11 - remainder;
}
