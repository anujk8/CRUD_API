import { z } from "zod";
export const addressCore = {
    user_id: z.number().int().positive("User ID must be a positive integer"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
};
// Create Address Schema
export const createAddressSchema = z.object({
    ...addressCore,
});
// Update Address Schema (all fields optional)
export const updateAddressSchema = z
    .object({
    ...addressCore,
})
    .partial();
// ID Param Schema
export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "Address ID must be a number"),
});
// Address response object (reusable)
const addressResponse = z.object({
    id: z.number(),
    ...addressCore,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
// Get single address response
export const getAddressResponseSchema = z.object({
    address: addressResponse,
});
// Get all addresses response (with optional pagination)
export const getAllAddressesResponseSchema = z.object({
    addresses: z.array(addressResponse)
});
// Query schema for GET Addresses with filter by pincode
export const getAllAddressesQuerySchema = z.object({
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode").optional(),
    // optional pagination as query strings (you can coerce/parse in handler if needed)
    page: z.string().regex(/^\d+$/, "Page must be a number").optional(),
    limit: z.string().regex(/^\d+$/, "Limit must be a number").optional(),
});
// Create address response
export const createAddressResponseSchema = z.object({
    message: z.string(),
    address: addressResponse,
});
// Update address response
export const updateAddressResponseSchema = z.object({
    message: z.string(),
    address: addressResponse,
});
// Delete address response
export const deleteAddressResponseSchema = z.object({
    message: z.string(),
    success: z.boolean(),
});
