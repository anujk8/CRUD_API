import Fastify from "fastify";
import { sequelize } from "./config/database.js";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import dotenv from "dotenv";
dotenv.config();
// For Auth
// import cors from '@fastify/cors';
// import jwt from '@fastify/jwt';
// import cookie from '@fastify/cookie'
// import authRoutes from "./routes/auth.routes.js";
import { logInfo, logError } from "./utils/logger.js";
import userRoutes from "./routes/user.routes.js";
import { addressRoutes } from "./routes/address.routes.js";
import swagger from "@fastify/swagger";
import SwaggerUi from "@fastify/swagger-ui";
// Create Fastify instance
const fastify = Fastify().withTypeProvider(); // {logger:true} for logging all details
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
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
// To register auth routes
// fastify.register(cors,{origin:true});
// fastify.register(cookie);
// fastify.register(jwt,{secret:'supersecretkey'});
// fastify.register(authRoutes,{prefix:'/auth'});
// Register routes
await fastify.register(userRoutes, { prefix: "/api" }); //Method use to add plugins(Register)
await fastify.register(addressRoutes, { prefix: "/api" });
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
        const port = Number(process.env.PORT) || 3000;
        fastify.listen({ port: port, host: '0.0.0.0' })
            .then(() => console.log(`Server running at http://localhost:${port}`))
            .catch(err => {
            console.error(err);
            process.exit(1);
        });
    }
    catch (error) {
        logError(` Server failed to start: ${error}`);
        process.exit(1);
    }
};
startServer();
