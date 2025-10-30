import fastify from "fastify";
import { createUserSchema, createUserResponseSchema, updateUserResponseSchema, updateUserSchema, deleteUserResponseSchema, getAllUsersResponseSchema, getUserResponseSchema, getAllUsersWithAddressesResponseSchema, idParamSchema, } from "../schemas/user.schema.js";
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getAllUsersWithAddressesController, } from "../controllers/user.controller.js";

// import {validatorCompiler, serializerCompiler} from  "fastify-type-provider-zod"
import { zodToJsonSchema} from "zod-to-json-schema";
import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";

// const app = fastify();
// app.setValidatorCompiler(validatorCompiler);
// app.setSerializerCompiler(serializerCompiler);
  

const userRoutes = async (fastify:FastifyInstance) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

    app.post("/users", {
        schema: {
            body: zodToJsonSchema(createUserSchema),
            response: {
                201: zodToJsonSchema(createUserResponseSchema),
            },
            description: "Create a new user",
            tags: ["Users"],
        },
    }, createUserController);

    app.get("/users", {
        schema: {
            response: {
                200: 
                  zodToJsonSchema(getAllUsersResponseSchema),
                  
                
            },
            description: "Fetch all users",
            tags: ["Users"],
        },
        handler: getAllUsersController
    });

    app.get("/users/:id", {
        schema: {
            params: zodToJsonSchema(idParamSchema),
            response: {
                200: zodToJsonSchema(getUserResponseSchema),
            },
            description: "Get a user by ID",
            tags: ["Users"],
        },
    }, getUserByIdController);

    app.put("/users/:id", {
        schema: {
            params: zodToJsonSchema(idParamSchema),
            body: zodToJsonSchema(updateUserSchema),
            response: {
                200: zodToJsonSchema(updateUserResponseSchema),
            },
            description: "Update a user by ID",
            tags: ["Users"],
        },
    }, updateUserController);

    app.get("/users/aggregate", {
        schema: {
            response: {
                200: zodToJsonSchema(getAllUsersWithAddressesResponseSchema),
            },
            description: "List all users with nested addresses",
            tags: ["Users"],
        },
    }, getAllUsersWithAddressesController);
    
    app.delete("/users/:id", {
        schema: {
            params: zodToJsonSchema(idParamSchema),
            response: {
                200: zodToJsonSchema(deleteUserResponseSchema),
            },
            description: "Delete a user by ID",
            tags: ["Users"],
        },
    }, deleteUserController);
};
export default userRoutes;
