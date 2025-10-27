import { FastifyInstance } from "fastify";
import {
  getAllUsersWithAddressesController,
  getAllAddressesWithPincodeController,
} from "../controllers/aggregateAPIs.controller.js";

export async function aggregateAPIsRoutes(fastify: FastifyInstance) {
  fastify.get("/users/aggregate", getAllUsersWithAddressesController);

  fastify.get("/addresses/aggregate", getAllAddressesWithPincodeController);
}
