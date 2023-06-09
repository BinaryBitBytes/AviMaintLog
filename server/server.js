import express from 'express'
// import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './src/typeDef-Resolvers/Resolvers/resolvers.js'
import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.js'
import { connectDB } from './config/connection.js'
// for (const [typeName, typeResolvers] of Object.entries(resolvers)) {
//   // Iterate over field resolvers for each type
//   for (const [fieldName, fieldResolver] of Object.entries(typeResolvers)) {
//     // Process each field resolver
//   }
// }
// connecting to the mongo database
connectDB()
// Global function to start the seerver asynchronously
const startServer = async () => {
  // This creates an Express application
  const app = express()
  // This creates the instance of the Apollo server with the typeDefs & resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start()
  // This applies the Apollo Server Middleware into the Express application
  server.applyMiddleware({ app })
  // This starts the server and listens on the respected port address
  app.listen({ port: 3069 }, () => {
    console.log(`The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`)
  })
}
// Starting the Express Server with the Mongoose Database
startServer().catch((error) => console.log(error))
