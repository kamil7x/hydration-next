import { dehydrate } from './dehydrate';

export const stringify = <T = any>(object: T): string => {
  const dehydrated = dehydrate(object);
  return JSON.stringify(dehydrated);
};
