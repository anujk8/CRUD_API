import { getAllUsersWithAddressesController, getAllAddressesWithPincodeController, } from "../controllers/aggregateAPIs.controller.js";
export async function aggregateAPIsRoutes(fastify) {
    fastify.get("/users/aggregate", getAllUsersWithAddressesController);
    fastify.get("/addresses/aggregate", getAllAddressesWithPincodeController);
}
