const mongoose = require('mongoose')

// Import Routes
const routes = require('./routes')
const fastifyEnv = require('fastify-env')
// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Require external modules

const schema = {
  type: 'object',
  required: [ 'MONGO_DB_URI' ],
  properties: {
    MONGO_DB_URI: {
      type: 'string'
    }
  }
}
const options = {
  confKey: 'config',
  dotenv: true,
  schema: schema,
  data: process.env
}
// Loop over each route
routes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    fastify.register(require('fastify-formbody'))
    fastify.register(fastifyEnv,options)
    
    fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
});
await fastify.ready();
    await fastify.listen(3000, 'localhost')
    //mongo
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
