import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController, } from "../controllers/user.controller.js";
export async function userRoutes(fastify) {
    fastify.post("/users", createUserController);
    fastify.get("/users", getAllUsersController);
    fastify.get("/users/:id", getUserByIdController);
    fastify.put("/users/:id", updateUserController);
    fastify.delete("/users/:id", deleteUserController);
}
