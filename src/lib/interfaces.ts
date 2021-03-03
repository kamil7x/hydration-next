/* eslint-disable functional/no-mixed-type */
export type TypedObject = {
  readonly _types?: Record<string, any>;
  readonly [key: string]: any;
};

export type TypeDefinition = {
  readonly test: (value: any) => boolean;
  readonly hydrate: (value: any) => any;
  readonly dehydrate: (value: any) => any;
};
