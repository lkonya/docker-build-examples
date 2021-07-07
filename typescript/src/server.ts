import fastify from "fastify";
const server = fastify({ logger: true });

// Declare a route
server.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
server.listen(3000, "0.0.0.0", function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});

// Handle shutdown (close server, close database connection, wait for ongoing requests to finish, etc)
const closeServer = async () => {
  server.log.info("Shutting down gracefully...");
  await server.close();
  console.log("Server shut down successfully");
  process.exit(0);
};
process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);
