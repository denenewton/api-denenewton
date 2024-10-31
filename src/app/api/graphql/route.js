import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { movies } from '../../../utils/movies.js'
import Movie from "../../../model/Movie.js";
import conn from "../../../utils/connectMongo";

(async function () {
  await conn();
})();


const schema = createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  
  const yogaApp = createYoga({
    schema,
    context: {movies, Movie},
    graphqlEndpoint: "/api/graphql",
    cors: request => {
      const requestOrigin = request.headers.get('origin')
      return {
        origin: requestOrigin,
        credentials: true,
        allowedHeaders: ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'],
        methods: ['POST']
      }
    },
    graphqlEndpoint: '/api/graphql',
    fetchAPI: { Response },
  });
  
  export { yogaApp as GET, yogaApp as POST , yogaApp as OPTIONS};
  