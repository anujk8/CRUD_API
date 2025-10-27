import { createAddressController, getAllAddressesController, getAddressByIdController, updateAddressController, deleteAddressController, } from "../controllers/address.controller.js";
export async function addressRoutes(fastify) {
    fastify.post("/addresses", createAddressController);
    fastify.get("/addresses", getAllAddressesController);
    fastify.get("/addresses/:id", getAddressByIdController);
    fastify.put("/addresses/:id", updateAddressController);
    fastify.delete("/addresses/:id", deleteAddressController);
}
