import { TypedObject } from './interfaces';
import { typeDefinitions } from './typeDefinitions';

export const hydrate = (input: TypedObject): any => {
  if (!input._types) return input;

  const inputTypes = input._types;

  return Object.entries(input)
    .filter(
      ([key]) =>
        Object.prototype.hasOwnProperty.call(input, key) && key !== '_types'
    )
    .reduce((result, [key, value]) => {
      const typeName = inputTypes[key];
      const typeDefinition = typeDefinitions[typeName];
      if (!typeDefinition) {
        console.error(`Missing hydrator for type ${typeName}`);
        return result;
      }

      return {
        ...result,
        [key]: typeDefinition.hydrate(value),
      };
    }, {});
};
