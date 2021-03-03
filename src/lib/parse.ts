import { hydrate } from './hydrate';

export const parse = <T = any>(input: string): T => {
  const parsed = JSON.parse(input);
  return hydrate(parsed) as T;
};
