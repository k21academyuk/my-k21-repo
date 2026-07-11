'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  slugify,
  truncate,
  titleCase,
  isPalindrome,
  wordCount,
  reverseWords,
} = require('../src');

test('slugify converts text to a URL-friendly slug', () => {
  assert.equal(slugify('Hello, World!'), 'hello-world');
  assert.equal(slugify('  Multiple   spaces  '), 'multiple-spaces');
  assert.equal(slugify('Already-slugified'), 'already-slugified');
  assert.equal(slugify('Symbols #@! removed'), 'symbols-removed');
  assert.equal(slugify('---trim---'), 'trim');
});

test('slugify rejects non-string input', () => {
  assert.throws(() => slugify(42), TypeError);
});

test('truncate shortens long strings and appends a suffix', () => {
  assert.equal(truncate('The quick brown fox', 9), 'The quic\u2026');
  assert.equal(truncate('short', 10), 'short');
  assert.equal(truncate('exactly10!', 10), 'exactly10!');
  assert.equal(truncate('custom suffix', 8, '...'), 'custo...');
});

test('truncate validates maxLength', () => {
  assert.throws(() => truncate('abc', -1), TypeError);
  assert.throws(() => truncate('abc', 2.5), TypeError);
});

test('titleCase capitalises each word and preserves spacing', () => {
  assert.equal(titleCase('hello there world'), 'Hello There World');
  assert.equal(titleCase('MIXED case INPUT'), 'Mixed Case Input');
  assert.equal(titleCase('one'), 'One');
});

test('isPalindrome ignores case, spaces and punctuation', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('Hello'), false);
  assert.equal(isPalindrome('   '), false);
});

test('wordCount counts whitespace-separated words', () => {
  assert.equal(wordCount('one two three'), 3);
  assert.equal(wordCount('  padded   words  '), 2);
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('   '), 0);
});

test('reverseWords reverses word order only', () => {
  assert.equal(reverseWords('the quick brown fox'), 'fox brown quick the');
  assert.equal(reverseWords('single'), 'single');
  assert.equal(reverseWords('  trim  me  '), 'me trim');
});
