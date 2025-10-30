import Fastify from "fastify";
import { sequelize } from "./config/database.js";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import dotenv from "dotenv";
dotenv.config();

import { logInfo, logError } from "./utils/logger.js";
import userRoutes from "./routes/user.routes.js";
import { addressRoutes } from "./routes/address.routes.js";

import swagger from "@fastify/swagger";
import SwaggerUi from "@fastify/swagger-ui";

const app = Fastify().withTypeProvider<ZodTypeProvider>(); // single typed instance


app.setErrorHandler((error, _request, reply) => {
  console.error("Unhandled error stack:", error?.stack ?? error);
  const status = (error && (error as any).statusCode) || 500;
  reply.status(status).send({
    statusCode: status,
    error: error?.name ?? "Internal Server Error",
    message: error?.message ?? "Internal Server Error",
  });
});

// For swagger UI and docs
async function bootstrap() {
 
  try {
    await app.register(swagger, {
      openapi: {
        info: {
          title: "My Fastify API",
          description: "API docs",
          version: "1.0.0",
        },
      },
    });
    await app.register(SwaggerUi, {
      routePrefix: "/docs",
      uiConfig: { docExpansion: "list", deepLinking: false },
    });
  } catch (err) {
    console.warn("Swagger registration failed (continuing):", err);
  }

  // register routes on the same app instance
  await app.register(userRoutes, { prefix: "/api" });
  await app.register(addressRoutes, { prefix: "/api" });

  // simple health route
  app.get("/", async () => ({ message: "Hello World" }));

  // DB and listen
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logInfo("Database connected successfully");

    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    logError(`Server failed to start: ${err}`);
    console.error(err);
    process.exit(1);
  }
}

bootstrap();