# Hydration Next
Simple library for serializing and rehydrating JavaScript objects with types memory.

## Installation
```  
npm install hydration-next  
```  
or
```  
yarn add hydration-next  
```  

## Usage
// TODO: improve this section
```  
import Hydra from 'hydration-next';  
  
const user = {    
  name: 'John',    
  age: 25,    
  isAdmin: false,    
_createdAt: new Date(), }  
  
const asString = Hydra.stringify(object) // {"name":"John","age":"25","isAdmin":"false","_createdAt":1614805531055,"_types":{"name":"string","age":"number","isAdmin":"boolean","_createdAt":"date"}}  
const rehydrated = Hydra.parse(asString); // { name: 'John', age: 25, isAdmin: false, _createdAt: 2021-03-03T21:05:31.055Z }  
  
```  

## Credits
This library was inspired by https://github.com/carlos8f/hydration and works basically the same. It's code was modernized with some extensions (`parse` and `stringify`).
