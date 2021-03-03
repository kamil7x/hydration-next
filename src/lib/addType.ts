/* eslint-disable functional/immutable-data */
import { TypeDefinition } from './interfaces';
import { typeDefinitions } from './typeDefinitions';

export const addType = (name: string, typeDefinition: TypeDefinition) => {
  if (typeDefinitions[name]) {
    console.error('Definition with this name already exists');
    return;
  }

  typeDefinitions[name] = typeDefinition;
};
