import test from 'ava';

import { parse } from './parse';

const testString = `
  {
    "name": "John",
    "age": "26",
    "isAdmin": "false",
    "_createdAt": "1615023898172",
    "_types": {
      "name": "string",
      "age": "number",
      "isAdmin": "boolean",
      "_createdAt": "Date"
    }
  }
`

test('parse', (t) => {
  t.plan(1);

  const parsedObject = parse(testString);
  t.is(typeof parsedObject, 'object');
});
