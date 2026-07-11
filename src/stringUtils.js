'use strict';

/**
 * string-toolkit
 * A small, dependency-free collection of string helpers.
 *
 * This library is intentionally simple. It exists so that a GitHub Actions
 * training audience has real code to lint, test, build and deploy while they
 * learn Git, pull requests and CI/CD.
 */

/**
 * Convert a string into a URL-friendly "slug".
 *
 *   slugify('  Hello, World! ')  ->  'hello-world'
 *
 * @param {string} input
 * @returns {string}
 */
function slugify(input) {
  assertString(input, 'slugify');
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // collapse runs of non-alphanumerics into one hyphen
    .replace(/^-+|-+$/g, ''); // strip leading / trailing hyphens
}

/**
 * Truncate a string to a maximum length, appending a suffix when cut.
 * The returned string (including the suffix) never exceeds maxLength.
 *
 *   truncate('The quick brown fox', 9)  ->  'The quic…'
 *
 * @param {string} input
 * @param {number} maxLength
 * @param {string} [suffix='…']
 * @returns {string}
 */
function truncate(input, maxLength, suffix = '\u2026') {
  assertString(input, 'truncate');
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new TypeError('truncate: maxLength must be a non-negative integer');
  }
  if (input.length <= maxLength) {
    return input;
  }
  if (maxLength <= suffix.length) {
    return suffix.slice(0, maxLength);
  }
  return input.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalise the first letter of every whitespace-separated word.
 *
 *   titleCase('hello there world')  ->  'Hello There World'
 *
 * @param {string} input
 * @returns {string}
 */
function titleCase(input) {
  assertString(input, 'titleCase');
  return input
    .split(/(\s+)/) // keep the whitespace separators so spacing is preserved
    .map((part) =>
      /\s+/.test(part) || part.length === 0
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join('');
}

/**
 * Determine whether a string is a palindrome, ignoring case, spaces
 * and punctuation.
 *
 *   isPalindrome('A man, a plan, a canal: Panama')  ->  true
 *
 * @param {string} input
 * @returns {boolean}
 */
function isPalindrome(input) {
  assertString(input, 'isPalindrome');
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (cleaned.length === 0) {
    return false;
  }
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

/**
 * Count the number of words in a string.
 *
 *   wordCount('  one   two three ')  ->  3
 *
 * @param {string} input
 * @returns {number}
 */
function wordCount(input) {
  assertString(input, 'wordCount');
  const trimmed = input.trim();
  if (trimmed === '') {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}

/**
 * Reverse the order of words in a string (words themselves are unchanged).
 *
 *   reverseWords('the quick brown fox')  ->  'fox brown quick the'
 *
 * @param {string} input
 * @returns {string}
 */
function reverseWords(input) {
  assertString(input, 'reverseWords');
  return input.trim().split(/\s+/).reverse().join(' ');
}

/**
 * Internal guard so every helper fails loudly on bad input.
 * @param {*} value
 * @param {string} fnName
 */
function assertString(value, fnName) {
  if (typeof value !== 'string') {
    throw new TypeError(`${fnName}: expected a string but received ${typeof value}`);
  }
}

module.exports = {
  slugify,
  truncate,
  titleCase,
  isPalindrome,
  wordCount,
  reverseWords,
};
