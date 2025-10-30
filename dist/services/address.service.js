// ...existing code...
import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
/**
 * Create a new address for a user
 */
export const createAddress = async (data) => {
    const user = await User.findByPk(data.user_id);
    if (!user)
        throw new Error("User not found. Invalid foreign key (user_id)");

     console.log(">>>>>>>>>>>>>>>>",typeof( data.user_id));
    const created = await Address.create(data);
    return created.get({ plain: true });
};
/**
 * Get all addresses with optional pincode filter (no pagination)
 */
export const getAllAddresses = async (pincode) => {
    const where = {};
    if (pincode)
        where.pincode = pincode;
    const addresses = await Address.findAll({
        where,
        attributes: ["id", "user_id", "street", "city", "state", "pincode", "created_at", "updated_at"],
        order: [["id", "ASC"]],
    });
    const plain = addresses.map((a) => a.get({ plain: true }));
    return {
        addresses: plain,
        total: plain.length,
    };
};
/**
 * Get address by ID
 */
export const getAddressById = async (id) => {
    const address = await Address.findByPk(id, {
        attributes: ["id", "user_id", "street", "city", "state", "pincode", "created_at", "updated_at"],
    });
    return address ? address.get({ plain: true }) : null;
};
/**
 * Update address by ID
 */
export const updateAddress = async (id, data) => {
    const address = await Address.findByPk(id);
    if (!address)
        throw new Error("Address not found");
    if (data.user_id) {
        const user = await User.findByPk(data.user_id);
        if (!user)
            throw new Error("User not found. Invalid foreign key (user_id)");
    }
    await address.update(data);
    const updated = await Address.findByPk(id, {
        attributes: ["id", "user_id", "street", "city", "state", "pincode", "created_at", "updatedAt"],
    });
    return updated.get({ plain: true });
};
/**
 * Delete address by ID
 */
export const deleteAddress = async (id) => {
    const deletedCount = await Address.destroy({ where: { id } });
    if (deletedCount === 0)
        throw new Error("Address not found");
    return;
};
/**
 * Alias for controllers that use this name
 */
export const getAllAddressesWithPincode = async (pincode) => {
    return getAllAddresses(pincode);
};
// ...existing code...
