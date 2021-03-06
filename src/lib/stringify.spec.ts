import test from 'ava';

import { stringify } from './stringify';

const testObject = {
  name: 'John',
  age: 26,
  isAdmin: false,
  _createdAt: new Date(),
};

test('stringify', (t) => {
  t.plan(1);

  const asString = stringify(testObject);
  t.is(typeof asString, 'string');
});
