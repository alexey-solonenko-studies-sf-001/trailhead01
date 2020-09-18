import { thisScopeTester } from './funcsObjCls/thisScope.js';
import { templateStringServer } from './varsTypesColls/templateLiteral.js';

console.log('global this');
console.log(this);
thisScopeTester();
templateStringServer();

/* test truthy */
console.log([] ? 1 : 0);
console.log({} ? 1 : 0)