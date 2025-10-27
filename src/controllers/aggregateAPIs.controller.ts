import { FastifyReply, FastifyRequest } from "fastify";

import { handleError, sendError, sendSuccess } from "../utils/response.js";

import {
  getAllUsersWithAddress,
  getAllAddressesWithPincode,
} from "../services/aggregateAPIs.service.js";

export const getAllUsersWithAddressesController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsersWithAddress();
    return sendSuccess(reply, users, "Users fetched successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};

export const getAllAddressesWithPincodeController = async (
  request: FastifyRequest<{ Querystring: { pincode?: string } }>,
  reply: FastifyReply
) => {
  try {
    const { pincode } = request.query;
    const result = await getAllAddressesWithPincode(pincode);

    if (pincode && result.length === 0) {
      return sendError(reply, "No addressses found for this pincode", 404);
    } else {
      return sendSuccess(
        reply,
        result,
        "Address With Pincode fetched successfully"
      );
    }
  } catch (error: any) {
    return handleError(error, reply);
  }
};
