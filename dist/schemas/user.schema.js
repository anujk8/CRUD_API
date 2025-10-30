import { z } from "zod";
export const userCore = {
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email"),
};
// To Create User Schema
export const createUserSchema = z.object({
    ...userCore,
});
// Update User Schema
export const updateUserSchema = z.object({
    ...userCore,
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(),
}).partial(); // Making all fields optional for 
export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "User ID must be a number")
});
//  Users response Object
const userResponse = z.object({
    id: z.number(),
    ...userCore,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
//Get Single User Response Schema
export const getUserResponseSchema = z.object({
    user: userResponse
});
// Get All Users Response Schema
export const getAllUsersResponseSchema = z.object({
    users: z.array(userResponse)
});
// Create User Response Schema
export const createUserResponseSchema = z.object({
    message: z.string(),
    user: userResponse
});
// To update Response
export const updateUserResponseSchema = z.object({
    message: z.string(),
    user: userResponse
});
// Delete User Response
export const deleteUserResponseSchema = z.object({
    message: z.string(),
    success: z.boolean()
});
// get All user With their Addresses Response Schema
const addressNestedResponse = z.object({
    id: z.number(),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
});
// User object shape matching your example (no createdAt/updatedAt)
const userWithAddresses = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    addresses: z.array(addressNestedResponse),
});
export const getAllUsersWithAddressesResponseSchema = z.array(userWithAddresses);
