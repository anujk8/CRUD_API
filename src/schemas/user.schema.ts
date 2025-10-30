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
 
}).partial();// Making all fields optional for 

export const idParamSchema = z.object({

  id: z.number().int("User ID must be a number"),

})

//  Users response Object
export const userResponse = z.object({
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  // Accept both Date objects and ISO strings for timestamps
  created_at: z.union([z.date(), z.string()]).transform((val) => 
    val instanceof Date ? val.toISOString() : val
  ).optional(),
  updated_at: z.union([z.date(), z.string()]).transform((val) => 
    val instanceof Date ? val.toISOString() : val
  ).optional(),
});

//Get Single User Response Schema
export const getUserResponseSchema = z.object({
  user: userResponse
});

// Get All Users Response Schema
export const getAllUsersResponseSchema = z.object({
  users: z.array(userResponse),
  total: z.number().int().optional(),
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
  success:z.boolean()
});

// get All user With their Addresses Response Schema

const addressNestedResponse = z.object({
  id: z.number().int(),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// User object shape matching your example (no createdAt/updatedAt)
 export const userWithAddresses = z.object({
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  addresses: z.array(addressNestedResponse),
});

export const getAllUsersWithAddressesResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(userWithAddresses),
});
// Types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponse>;
export type GetAllUsersResponse = z.infer<typeof getAllUsersResponseSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
export type GetAllUsersWithAddressesResponse = z.infer<typeof getAllUsersWithAddressesResponseSchema>;
export type GetUserWithAddressesResponse = z.infer<typeof userWithAddresses>;