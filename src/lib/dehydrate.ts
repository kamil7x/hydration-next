import { TypedObject } from './interfaces';
import { typeDefinitions } from './typeDefinitions';
import { getTypeName, isPrimitiveOrNull } from './utils';

type ReduceResult = {
  readonly typedObject: TypedObject;
  readonly objectTypes: Record<string, string>;
};

export const dehydrate = (input: any): TypedObject => {
  if (isPrimitiveOrNull(input)) return input;

  const { typedObject, objectTypes } = Object.entries(input).reduce(
    (result, [key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(input, key)) return result;

      const typeName = getTypeName(value);
      if (!typeName) {
        console.error(`Missing dehydrator for property ${key}`);
        return result;
      }

      const typeDefinition = typeDefinitions[typeName];

      return {
        typedObject: {
          ...result.typedObject,
          [key]: typeDefinition.dehydrate(value),
        },
        objectTypes: {
          ...result.objectTypes,
          [key]: typeName,
        },
      };
    },
    {
      typedObject: Object.create(Object.getPrototypeOf(input)),
      objectTypes: {},
    } as ReduceResult
  );

  if (Object.keys(objectTypes).length) {
    return {
      ...typedObject,
      _types: objectTypes,
    };
  }

  return typedObject;
};
