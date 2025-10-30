import { createAddressController, getAllAddressesController, getAddressByIdController, updateAddressController, deleteAddressController, getAllAddressesWithPincodeController, } from "../controllers/address.controller.js";
import { createAddressSchema, createAddressResponseSchema, updateAddressSchema, updateAddressResponseSchema, deleteAddressResponseSchema, getAllAddressesResponseSchema, getAddressResponseSchema, getAllAddressesQuerySchema, idParamSchema, } from "../schemas/address.schema.js";
export async function addressRoutes(fastify) {
    const app = fastify.withTypeProvider();

    app.post("/addresses", {
        schema: {
            body: createAddressSchema,
            response: {
                201: zodToJsonSchema(createAddressResponseSchema),
            },
            description: "Create a new address",
            tags: ["Addresses"],
        },
    }, createAddressController);

    app.get("/addresses", {
        schema: {
            querystring: getAllAddressesQuerySchema,
            response: {
                200: zodToJsonSchema(getAllAddressesResponseSchema),
            },
            description: "List all addresses (optional filter by pincode)",
            tags: ["Addresses"],
        },
    }, getAllAddressesController);
    app.get("/addresses/:id", {
        schema: {
            params: idParamSchema,
            response: {
                200: zodToJsonSchema(getAddressResponseSchema),
            },
            description: "Get an address by ID",
            tags: ["Addresses"],
        },
    }, getAddressByIdController);
    app.get("/addresses/aggregate", {
        schema: {
            querystring: getAllAddressesQuerySchema,
            response: {
                200: zodToJsonSchema(getAllAddressesResponseSchema),
            },
            description: "Aggregate / list addresses with optional pincode filter",
            tags: ["Addresses"],
        },
    }, getAllAddressesWithPincodeController);
    app.put("/addresses/:id", {
        schema: {
            params: idParamSchema,
            body: updateAddressSchema,
            response: {
                200: zodToJsonSchema(updateAddressResponseSchema),
            },
            description: "Update an address by ID",
            tags: ["Addresses"],
        },
    }, updateAddressController);
    app.delete("/addresses/:id", {
        schema: {
            params: idParamSchema,
            response: {
                200: zodToJsonSchema(deleteAddressResponseSchema),
            },
            description: "Delete an address by ID",
            tags: ["Addresses"],
        },
    }, deleteAddressController);
}
