import { Op } from "sequelize";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
/**
 * Create a new user
 */
export const createUser = async (data) => {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing)
        throw new Error("Email already exists");
    const created = await User.create(data);
    return created.get({ plain: true });
};
export const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: ["id", "first_name", "last_name", "email", "created_at", "updated_at"],
        include: [
            {
                model: Address,
                attributes: ["id", "user_id", "street", "city", "state", "pincode"],
            },
        ],
    });
    if (!user)
        return null;
    return user.get({ plain: true });
};
/**
 * Get all users (basic fields)
 */
export const getAllUsers = async () => {
    const users = await User.findAll({ attributes: ["id", "first_name", "last_name", "email"] });
    return users.map(u => u.get({ plain: true }));
};
/**
 * Update user by id
 */
export const updateUser = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user)
        throw new Error("User not found");
    if (data.email) {
        const existing = await User.findOne({ where: { email: data.email, id: { [Op.ne]: id } } });
        if (existing)
            throw new Error("No two users can have the same email");
    }
    await user.update(data);
    const updated = await User.findByPk(id, { attributes: ["id", "first_name", "last_name", "email", "created_at", "updated_at"] });
    return updated.get({ plain: true });
};
/**
 * Delete user by id
 */
export const deleteUser = async (id) => {
    const deletedCount = await User.destroy({ where: { id } });
    if (deletedCount === 0)
        throw new Error("User not found");
    return;
};
/**
 * Get all users with nested addresses
 */
export const getAllUsersWithAddress = async () => {
    const users = await User.findAll({
        attributes: ["id", "first_name", "last_name", "email"],
        include: [{ model: Address, attributes: ["id", "street", "city", "state", "pincode"] }],
    });
    return users.map(u => u.get({ plain: true }));
};
