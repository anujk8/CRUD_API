import { FastifyReply, FastifyRequest } from "fastify";

import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../services/address.service.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";

import { logInfo, logError } from "../utils/logger.js";

// Create Address
export const createAddressController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user_id, street, city, state, pincode } = request.body as any;

    if (!user_id || !street || !city || !state || !pincode)
      return sendError(reply, "All fields are required", 400);

    

    const address = await createAddress({
      user_id,
      street,
      city,
      state,
      pincode,
    });
    logInfo(`Address created for user ${user_id}`);
    return sendSuccess(reply, address, "Address created successfully");
  } catch (error: any) {
    logError(error.message);
    return handleError(error, reply);
  }
};

// Get All Addresses
export const getAllAddressesController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const addresses = await getAllAddresses();
    return sendSuccess(reply, addresses, "Addresses fetched successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};

// Get Address by ID
export const getAddressByIdController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;

    const address = await getAddressById(Number(id));

    if (!address) return sendError(reply, "Address not found", 404);

    return sendSuccess(reply, address, "Address fetched successfully");
  } catch (error: any) {
    // console.log("Anuj<<<<<<<<<<<<");

    return handleError(error, reply);
  }
};

// Update Address
export const updateAddressController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;
    const updated = await updateAddress(Number(id), request.body);
    return sendSuccess(reply, updated, "Address updated successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};

// Delete Address
export const deleteAddressController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;
    await deleteAddress(Number(id));
    return sendSuccess(reply, null, "Address deleted successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};
