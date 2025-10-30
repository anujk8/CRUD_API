
import { FastifyReply, FastifyRequest } from "fastify";
import  {
  updateUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllUsersWithAddress,
} from "../services/user.service.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";
import { logError } from "../utils/logger.js";

import {
  createUserSchema,
  createUserResponseSchema,
  updateUserResponseSchema,
  updateUserSchema,
  deleteUserResponseSchema,
  getAllUsersResponseSchema,
  getUserResponseSchema,
  getAllUsersWithAddressesResponseSchema,
  CreateUserInput,
} from "../schemas/user.schema.js";

// Create User
export const createUserController = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  try {
    // validate request body
    
    const body = createUserSchema.parse(request?.body);

    

    // create user via service
    const user = await createUser(body);
   
    

    // build and validate response shape
    const response = createUserResponseSchema.parse({
      message: "User created successfully",
      user,
    });

    return sendSuccess(reply, response, "User created successfully");
  } catch (error: any) {
    logError(error?.message);
    return handleError(error, reply);
  }
};

// Get All Users
export const getAllUsersController = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsers();

    // build response object expected by schema
    const responseObj = {
      users:users,
      total: Array.isArray(users) ? users.length : 0,
    };

    const parsed = getAllUsersResponseSchema.parse(responseObj);
    console.log(">>>>>>>>>>>>>",parsed);

    return reply.code(200).send(parsed);
  } catch (error: any) {
    
    logError(error?.message);
    
    return handleError(error, reply);
  }
};

// Get Single User
export const getUserByIdController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;
    const user = await getUserById(Number(id));

    if (!user) return sendError(reply, "User not found", 404);

    const parsed = getUserResponseSchema.parse({ user });

    return reply.code(200).send(parsed);
  } catch (error: any) {
    logError(error?.message);
    return handleError(error, reply);
  }
};

// Update User
export const updateUserController = async (
  request: FastifyRequest<{ Params: { id: number }; Body: any }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;
    const data = updateUserSchema.parse(request.body);

    const updatedUser = await updateUser(Number(id), data);

    const parsed = updateUserResponseSchema.parse({
      message: "User updated successfully",
      user: updatedUser,
    });

    return reply.code(200).send(parsed);
  } catch (error: any) {
    logError(error?.message);
    return handleError(error, reply);
  }
};

// Delete User
export const deleteUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as any;

    await deleteUser(Number(id));

    const parsed = deleteUserResponseSchema.parse({
      message: "User deleted successfully",
      success: true,
    });

    return reply.code(200).send(parsed);
  } catch (error: any) {
    logError(error?.message);
    return handleError(error, reply);
  }
};

export const getAllUsersWithAddressesController = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsersWithAddress();

    const parsed = getAllUsersWithAddressesResponseSchema.parse(users);

    return reply.code(200).send(parsed);
  } catch (error: any) {
    logError(error?.message);
    return handleError(error, reply);
  }
};
