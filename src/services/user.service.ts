import { FastifyReply } from "fastify";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
import { sendError, sendSuccess } from "../utils/response.js";

// Create a new user
export const createUser = async (data: any) => {
  const existing = await User.findOne({
    where: { email: data.email },
  });

  if (existing) throw new Error("Email already Exit");
  return await User.create(data);
};

// Get all users
export const getAllUsers = async () => {
  return await User.findAll();
};

// Get a single user by ID
export const getUserById = async (id: number) => {
  return await User.findByPk(id, { include: [{ model: Address }] });
};

// Update user by ID
async function updateUser(reply: FastifyReply, id: number, data: any) {
  try {
    const user = await User.findByPk(id);
    // console.log(`user before update ${user}`);
    if (!user) {
      return sendError(reply, "User not found", 404);
    }

    const existing = await User.findOne({
      where: { email: data.email },
    });

    if (existing) throw new Error("No two user can have same email");

    

    await user.update(data);

    // console.log("updatedUser", updateduser)

    const updatedUser = await User.findByPk(id);

    return sendSuccess(reply, updatedUser, "User updated successfully");
  } catch (error: any) {
    return sendError(reply, error.message || "Failed to update user");
  }
}

// Delete user by ID
export const deleteUser = async (reply: FastifyReply, id: number) => {
  try {
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return sendError(reply, "User not found", 404);
    }

    return sendSuccess(reply, null, "User deleted successfully");
  } catch (error: any) {
    return sendError(reply, error.message || "Failed to delete user");
  }
};

export default updateUser;
