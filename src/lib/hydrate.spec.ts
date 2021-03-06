/* eslint-disable functional/immutable-data */
import test from 'ava';
import sinon from 'sinon';

import { hydrate } from './hydrate';

const testObjectWithoutTypes = {
  name: 'John',
  age: '26',
  isAdmin: 'false',
  _createdAt: 1615023898172,
};
const testObject = {
  ...testObjectWithoutTypes,
  _types: {
    name: 'string',
    age: 'number',
    isAdmin: 'boolean',
    _createdAt: 'Date',
  },
};

test.beforeEach((t) => {
  (t.context as any).error = console.error;
  console.error = sinon.spy();
});

test.afterEach((t) => {
  console.error = (t.context as any).error;
});

test('hydrate', (t) => {
  t.plan(6);

  const propertyCount = Object.keys(testObject._types).length;
  const hydrated = hydrate(testObject);

  t.is(hydrated._types, undefined);
  t.is(Object.keys(hydrated).length, propertyCount);
  t.is(typeof hydrated.name, 'string');
  t.is(typeof hydrated.age, 'number');
  t.is(typeof hydrated.isAdmin, 'boolean');
  t.true(hydrated._createdAt instanceof Date);
});

test('hydrate - missing _types', (t) => {
  t.plan(1);

  const hydrated = hydrate(testObjectWithoutTypes);
  t.is(hydrated, testObjectWithoutTypes);
});

test('hydrate - missing definition', (t) => {
  t.plan(1);

  const testObjectWithAdditionalProperty = {
    ...testObject,
    foo: 'foobar',
    _types: {
      ...testObject._types,
      foo: 'Foo',
    },
  };

  const hydrated = hydrate(testObjectWithAdditionalProperty);
  t.is(hydrated.foo, undefined);
});
