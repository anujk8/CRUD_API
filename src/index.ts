import Fastify from "fastify";
import { sequelize } from "./config/database.js";

import dotenv from "dotenv";

dotenv.config();

import { logInfo, logError } from "./utils/logger.js";
import { userRoutes } from "./routes/user.routes.js";
import { addressRoutes } from "./routes/address.routes.js";
import { aggregateAPIsRoutes } from "./routes/aggregateAPIs.routes.js";
import swagger from "@fastify/swagger";
import SwaggerUi from "@fastify/swagger-ui";

// Create Fastify instance
const fastify = Fastify(); // {logger:true} for logging all details

async function swaggerFunction() {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "My Fastify API",
        description: "API documentation for my project",
        version: "1.0.0",
      },
    },
  });
}

await swaggerFunction();

await fastify.register(SwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

// Register routes
fastify.register(userRoutes, { prefix: "/api" }); //Method use to add plugins(Register)
fastify.register(addressRoutes, { prefix: "/api" });
fastify.register(aggregateAPIsRoutes, { prefix: "/api" });

// Root route
fastify.get("/", async () => {
  return { message: "Hello World" };
});

// Start server function
const startServer = async () => {
  try {
    // Connect & sync database

    await sequelize.authenticate();

    await sequelize.sync(); // ORM help to create table from models

    logInfo(" Database connected successfully");

    const port= Number(process.env.PORT) || 3000;

    // console.log(` ${port}`);

    // Start Fastify server

     await fastify.listen({port:port});
     
    logInfo(` Server running at http://localhost:${port}`);
  } catch (error: any) {
    logError(` Server failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
