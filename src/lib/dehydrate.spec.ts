import test from 'ava';

import { dehydrate } from './dehydrate';

const testObject = {
  name: 'John',
  age: 26,
  isAdmin: false,
  _createdAt: new Date(),
}

test('dehydrate', (t) => {
  t.plan(6);

  const dehydrated = dehydrate(testObject);

  t.not(dehydrated._types, undefined);
  t.is(Object.keys(dehydrated._types || {}).length, Object.keys(testObject).length);
  t.is(dehydrated._types?.name, 'string');
  t.is(dehydrated._types?.age, 'number');
  t.is(dehydrated._types?.isAdmin, 'boolean');
  t.is(dehydrated._types?._createdAt, 'Date');
});
