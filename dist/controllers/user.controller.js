import { updateUser, createUser, getAllUsers, getUserById, deleteUser, getAllUsersWithAddress, } from "../services/user.service.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";
import { logError } from "../utils/logger.js";
import { createUserSchema, createUserResponseSchema, updateUserResponseSchema, updateUserSchema, deleteUserResponseSchema, getAllUsersResponseSchema, getUserResponseSchema, getAllUsersWithAddressesResponseSchema, } from "../schemas/user.schema.js";
// Create User
export const createUserController = async (request, reply) => {
    try {
        // validate request body
        console.log(">>>>>>>>>>>", request);
        const body = createUserSchema.parse(request?.body);
        // create user via service
        const user = await createUser(body);
        // build and validate response shape
        const response = createUserResponseSchema.parse({
            message: "User created successfully",
            user,
        });
        return sendSuccess(reply, response, "User created successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Get All Users
export const getAllUsersController = async (_req, reply) => {
    try {
        const users = await getAllUsers();
        // build response object expected by schema
        const responseObj = {
            users,
            total: Array.isArray(users) ? users.length : 0,
        };
        const parsed = getAllUsersResponseSchema.parse(responseObj);
        return sendSuccess(reply, parsed, "Users fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Get Single User
export const getUserByIdController = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await getUserById(Number(id));
        if (!user)
            return sendError(reply, "User not found", 404);
        const parsed = getUserResponseSchema.parse({ user });
        return sendSuccess(reply, parsed, "User fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Update User
export const updateUserController = async (request, reply) => {
    try {
        const { id } = request.params;
        const data = updateUserSchema.parse(request.body);
        const updatedUser = await updateUser(Number(id), data);
        const parsed = updateUserResponseSchema.parse({
            message: "User updated successfully",
            user: updatedUser,
        });
        return sendSuccess(reply, parsed, "User updated successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Delete User
export const deleteUserController = async (request, reply) => {
    try {
        const { id } = request.params;
        await deleteUser(Number(id));
        const parsed = deleteUserResponseSchema.parse({
            message: "User deleted successfully",
            success: true,
        });
        return sendSuccess(reply, parsed, "User deleted successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
export const getAllUsersWithAddressesController = async (request, reply) => {
    try {
        const users = await getAllUsersWithAddress();
        const parsed = getAllUsersWithAddressesResponseSchema.parse(users);
        return sendSuccess(reply, parsed, "Users fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
