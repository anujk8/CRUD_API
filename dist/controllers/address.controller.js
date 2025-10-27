import { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress, } from "../services/address.service.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";
import { logInfo, logError } from "../utils/logger.js";
// Create Address
export const createAddressController = async (request, reply) => {
    try {
        const { user_id, street, city, state, pincode } = request.body;
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
    }
    catch (error) {
        logError(error.message);
        return handleError(error, reply);
    }
};
// Get All Addresses
export const getAllAddressesController = async (request, reply) => {
    try {
        const addresses = await getAllAddresses();
        return sendSuccess(reply, addresses, "Addresses fetched successfully");
    }
    catch (error) {
        return handleError(error, reply);
    }
};
// Get Address by ID
export const getAddressByIdController = async (request, reply) => {
    try {
        const { id } = request.params;
        const address = await getAddressById(Number(id));
        if (!address)
            return sendError(reply, "Address not found", 404);
        return sendSuccess(reply, address, "Address fetched successfully");
    }
    catch (error) {
        // console.log("Anuj<<<<<<<<<<<<");
        return handleError(error, reply);
    }
};
// Update Address
export const updateAddressController = async (request, reply) => {
    try {
        const { id } = request.params;
        const updated = await updateAddress(Number(id), request.body);
        return sendSuccess(reply, updated, "Address updated successfully");
    }
    catch (error) {
        return handleError(error, reply);
    }
};
// Delete Address
export const deleteAddressController = async (request, reply) => {
    try {
        const { id } = request.params;
        await deleteAddress(Number(id));
        return sendSuccess(reply, null, "Address deleted successfully");
    }
    catch (error) {
        return handleError(error, reply);
    }
};
