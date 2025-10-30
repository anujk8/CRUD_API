import { createAddress, getAllAddresses, getAddressById, updateAddress, deleteAddress, getAllAddressesWithPincode, } from "../services/address.service.js";
import { createAddressSchema, getAllAddressesQuerySchema, getAllAddressesResponseSchema, getAddressResponseSchema, updateAddressSchema, updateAddressResponseSchema, deleteAddressResponseSchema, idParamSchema, } from "../schemas/address.schema.js";
import { sendError, sendSuccess, handleError } from "../utils/response.js";
import { logInfo, logError } from "../utils/logger.js";
// Create Address
export const createAddressController = async (request, reply) => {
    try {
        const body = createAddressSchema.parse(request.body);

        const address = await createAddress(body);

        const parsed = createAddressSchema.parse({
            message: "Address created successfully",
            address,
        });
       
        
        logInfo(`Address created for user ${body.user_id}`);
        return sendSuccess(reply, parsed, "Address created successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Get All Addresses
export const getAllAddressesController = async (request, reply) => {
    try {
        const query = getAllAddressesQuerySchema.parse(request.query);
        const result = await getAllAddresses(query.pincode);
        const parsed = getAllAddressesResponseSchema.parse(result);
        return sendSuccess(reply, parsed, "Addresses fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Get Address by ID
export const getAddressByIdController = async (request, reply) => {
    try {
        const params = idParamSchema.parse(request.params);
        const id = Number(params.id);
        const address = await getAddressById(id);
        if (!address)
            return sendError(reply, "Address not found", 404);
        const parsed = getAddressResponseSchema.parse({ address });
        return sendSuccess(reply, parsed, "Address fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Update Address
export const updateAddressController = async (request, reply) => {
    try {
        const params = idParamSchema.parse(request.params);
        const id = Number(params.id);
        const body = updateAddressSchema.parse(request.body);
        const updated = await updateAddress(id, body);
        const parsed = updateAddressResponseSchema.parse({
            message: "Address updated successfully",
            address: updated,
        });
        return sendSuccess(reply, parsed, "Address updated successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
// Delete Address
export const deleteAddressController = async (request, reply) => {
    try {
        const params = idParamSchema.parse(request.params);
        const id = Number(params.id);
        await deleteAddress(id);
        const parsed = deleteAddressResponseSchema.parse({
            message: "Address deleted successfully",
            success: true,
        });
        return sendSuccess(reply, parsed, "Address deleted successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
export const getAllAddressesWithPincodeController = async (request, reply) => {
    try {
        const query = getAllAddressesQuerySchema.parse(request.query);
        const result = await getAllAddressesWithPincode(query.pincode);
        // result follows GetAllAddressesResponse shape
        if (query.pincode && result.addresses.length === 0) {
            return sendError(reply, "No addresses found for this pincode", 404);
        }
        const parsed = getAllAddressesResponseSchema.parse(result);
        return sendSuccess(reply, parsed, "Addresses fetched successfully");
    }
    catch (error) {
        logError(error?.message);
        return handleError(error, reply);
    }
};
