/* eslint-disable functional/no-class, functional/no-this-expression, functional/immutable-data */
import test from 'ava';
import sinon from 'sinon';

import { addType } from './addType';
import { typeDefinitions } from './typeDefinitions';
import { identity, toString } from './utils';

class Foo {
  constructor(private readonly data: string) {}
  get() {
    return this.data;
  }
}

test.beforeEach((t) => {
  (t.context as any).error = console.error;
  console.error = sinon.spy();
});

test.afterEach((t) => {
  console.error = (t.context as any).error;
});

test('addType', (t) => {
  t.plan(2);

  const builtInTypesCount = Object.keys(typeDefinitions).length;

  const typeName = 'Foo';
  addType(typeName, {
    test: (value: any) => value instanceof Foo,
    hydrate: (value: string) => new Foo(value),
    dehydrate: toString,
  });

  t.is(Object.keys(typeDefinitions).length, builtInTypesCount + 1);
  t.not(typeDefinitions[typeName], undefined);
});

test('addType - existing type', (t) => {
  t.plan(1);

  const builtInTypesCount = Object.keys(typeDefinitions).length;

  addType('string', {
    test: (value: any) => typeof value === 'string',
    hydrate: identity,
    dehydrate: identity,
  });

  t.is(Object.keys(typeDefinitions).length, builtInTypesCount);
});
