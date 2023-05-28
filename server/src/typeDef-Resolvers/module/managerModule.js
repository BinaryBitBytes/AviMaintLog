import{ typeDef } from '../managerSchema.js'; //!
import { resolvers } from '../managerSchema.js'; //!
import { createModule } from 'graphql-modules';

import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const ManagerModule = createModule({ //!
  id: 'manager-module',  //!
  dirname: __dirname,
  typeDefs: [typeDef],
  resolvers: [resolvers]
});