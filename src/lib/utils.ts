import { typeDefinitions } from './typeDefinitions';

export const isPrimitiveOrNull = (input: any): boolean =>
  input === null || typeof input !== 'object';

export const getTypeName = (value: any) => {
  const detectedType = Object.entries(typeDefinitions).reduce(
    (result: string | null, [typeName, typeDefinition]) => {
      if (typeName === 'object') return result;
      if (typeDefinition.test(value)) return typeName;
      return result;
    },
    null
  );

  if (detectedType) {
    return detectedType;
  }
  return typeof value === 'object' ? 'object' : null;
};

export const identity = (val: any): any => val;
export const toString = (val: any): string =>
  val.toString ? val.toString() : val;
