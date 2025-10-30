
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  createAddressController,
  getAllAddressesController,
  getAddressByIdController,
  updateAddressController,
  deleteAddressController,
  getAllAddressesWithPincodeController,
} from "../controllers/address.controller.js";

import {
  createAddressSchema,
  createAddressResponseSchema,
  updateAddressSchema,
  updateAddressResponseSchema,
  deleteAddressResponseSchema,
  getAllAddressesResponseSchema,
  getAddressResponseSchema,
  getAllAddressesQuerySchema,
  idParamSchema,
} from "../schemas/address.schema.js";
import { zodToJsonSchema} from "zod-to-json-schema";

export async function addressRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/addresses",
    {
      schema: {
        body: zodToJsonSchema(createAddressSchema),
        response: {
          201: zodToJsonSchema(createAddressResponseSchema),
        },
        description: "Create a new address",
        tags: ["Addresses"],
      },
    },
    createAddressController
  );

  app.get(
    "/addresses",
    {
      schema: {
        querystring: zodToJsonSchema(getAllAddressesQuerySchema),
        response: {
          200: zodToJsonSchema(getAllAddressesResponseSchema),
        },
        description: "List all addresses (optional filter by pincode)",
        tags: ["Addresses"],
      },
    },
    getAllAddressesController
  );

  app.get(
    "/addresses/:id",
    {
      schema: {
        params: zodToJsonSchema(idParamSchema),
        response: {
          200: zodToJsonSchema(getAddressResponseSchema),
        },
        description: "Get an address by ID",
        tags: ["Addresses"],
      },
    },
    getAddressByIdController
  );

  app.get(
    "/addresses/aggregate",
    {
      schema: {
        querystring: zodToJsonSchema(getAllAddressesQuerySchema),
        response: {
          200: zodToJsonSchema(getAllAddressesResponseSchema),
        },
        description: "Aggregate / list addresses with optional pincode filter",
        tags: ["Addresses"],
      },
    },
    getAllAddressesWithPincodeController
  );

  app.put(
    "/addresses/:id",
    {
      schema: {
        params: zodToJsonSchema(idParamSchema),
        body: zodToJsonSchema(updateAddressSchema),
        response: {
          200: zodToJsonSchema(updateAddressResponseSchema),
        },
        description: "Update an address by ID",
        tags: ["Addresses"],
      },
    },
    updateAddressController
  );

  app.delete(
    "/addresses/:id",
    {
      schema: {
        params: zodToJsonSchema(idParamSchema),
        response: {
          200: zodToJsonSchema(deleteAddressResponseSchema),
        },
        description: "Delete an address by ID",
        tags: ["Addresses"],
      },
    },
    deleteAddressController
  );
}
