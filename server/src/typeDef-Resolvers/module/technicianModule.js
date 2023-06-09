import { TechnicianTypeDefs } from '../Schema/technicianSchema.js' //!
import { resolver } from '../Resolvers/technicianResolver.js' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const TechnicianModule = createModule({ //!
  id: 'technician-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: TechnicianTypeDefs,
  resolvers: resolver
})

// console.log(TechnicianModule)