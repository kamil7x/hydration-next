import test from 'ava';

import { hydrate } from './hydrate';

const testObject = {
  name: 'John',
  age: '26',
  isAdmin: 'false',
  _createdAt: 1615023898172,
  _types: {
    name: 'string',
    age: 'number',
    isAdmin: 'boolean',
    _createdAt: 'Date'
  }
}


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
