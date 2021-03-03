import { dehydrate } from './dehydrate';
import { hydrate } from './hydrate';
import { TypeDefinition, TypedObject } from './interfaces';
import { identity, toString } from './utils';

export const typeDefinitions: Record<string, TypeDefinition> = {
  string: {
    test: (value: any) => typeof value === 'string',
    hydrate: identity,
    dehydrate: identity,
  },

  number: {
    test: (value: any) => typeof value === 'number',
    hydrate: (value: string) => parseFloat(value),
    dehydrate: toString,
  },

  boolean: {
    test: (value: any) => typeof value === 'boolean',
    hydrate: (value: string) => !(value === 'false' || value === '0'),
    dehydrate: toString,
  },

  null: {
    test: (value: any) => value === null,
    hydrate: () => null,
    dehydrate: () => '',
  },

  date: {
    test: (value: any) => value instanceof Date,
    hydrate: (value: number): Date => new Date(value),
    dehydrate: (value: Date): number => +value,
  },

  regexp: {
    test: (value: any) => value instanceof RegExp,
    hydrate: (value: string): RegExp =>
      new RegExp(value.replace(/(^\/|\/$)/g, '')),
    dehydrate: toString,
  },

  buffer: {
    test: (value: any) => Buffer.isBuffer(value),
    hydrate: (value: string): Buffer => new Buffer(value, 'base64'),
    dehydrate: (value: Buffer): string => value.toString('base64'),
  },

  array: {
    test: (value: any) => Array.isArray(value),
    hydrate: (value: TypedObject): readonly any[] =>
      Object.values(hydrate(value)),
    dehydrate: (value: readonly any[]) => dehydrate({ ...value }),
  },

  object: {
    test: (value: any) => value && typeof value === 'object',
    hydrate: (value: TypedObject): any => hydrate(value),
    dehydrate: (value: any): TypedObject => dehydrate(value),
  },
};
