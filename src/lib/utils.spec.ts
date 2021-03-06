import test from 'ava';

import { getTypeName, identity, isPrimitiveOrNull, toString } from './utils';

test('isPrimitiveOrNull', (t) => {
  t.plan(6);

  t.true(isPrimitiveOrNull('test'));
  t.true(isPrimitiveOrNull(4));
  t.true(isPrimitiveOrNull(null));
  t.false(isPrimitiveOrNull(new Date()));
  t.false(isPrimitiveOrNull([]));
  t.false(isPrimitiveOrNull({}));
});

test('getTypeName', (t) => {
  t.plan(7);

  t.is(getTypeName('Hello world!'), 'string');
  t.is(getTypeName(5), 'number');
  t.is(getTypeName(true), 'boolean');
  t.is(getTypeName(null), 'null');
  t.is(getTypeName(new Date()), 'Date');
  t.is(getTypeName([1, 2, 3]), 'array');
  t.is(getTypeName({ key: 'value ' }), 'object');
});

test('identity', (t) => {
  t.plan(4);

  const inputString = 'test';
  const resultString = identity(inputString);

  t.is(resultString, inputString);
  t.is(typeof resultString, typeof inputString);

  const inputNumber = 4;
  const resultNumber = identity(inputNumber);

  t.is(resultNumber, inputNumber);
  t.is(typeof resultNumber, typeof inputNumber);
});

test('toString', (t) => {
  t.plan(2);

  const inputDate = new Date();
  const inputNumber = 4;

  t.is(typeof toString(inputDate), 'string');
  t.is(typeof toString(inputNumber), 'string');
});
