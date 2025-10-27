import { FastifyReply, FastifyRequest } from "fastify";
import updateUser, {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../services/user.service.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";
import { logInfo, logError } from "../utils/logger.js";
import { isValidEmail } from "../utils/isValidEmail.js";

// Create User
export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { first_name, last_name, email } = request.body as any;

    if (!first_name || !last_name || !email)
      return sendError(reply, "All fields are required", 400);

    if (!isValidEmail(email))
      return sendError(reply, "Invalid email format", 400);

    const user = await createUser({ first_name, last_name, email });
    logInfo(`User created: ${user.email}`);
    return sendSuccess(reply, user, "User created successfully");
  } catch (error: any) {
    logError(error.message);
    return handleError(error, reply);
  }
};

// Get All Users
export const getAllUsersController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsers();
    return sendSuccess(reply, users, "Users fetched successfully");
  } catch (error: any) {
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
    return sendSuccess(reply, user, "User fetched successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};

// Update User
export const updateUserController = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const data = request.body;

    await updateUser(reply, id, data);

    return sendSuccess(reply, data, "User Created successfully");
  } catch (error: any) {
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

    await deleteUser(reply, id);

    return sendSuccess(reply, null, "User deleted successfully");
  } catch (error: any) {
    return handleError(error, reply);
  }
};
