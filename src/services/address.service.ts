import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";


// Create a new address for a user
export const createAddress = async (data: any) => {

  const user = await User.findByPk(data.user_id);
  if(!user)  throw new Error("User not found. Invalid foreign key(user_id)")

  return await Address.create(data);
};

// Get all addresses with their linked user
export const getAllAddresses = async () => {
  return await Address.findAll();
};

// Get address by ID
export const getAddressById = async (id: number) => {
   
    
  return await Address.findByPk(id);
};

// Update address by ID
export const updateAddress = async (id: number, data: any) => {
  await Address.update(data, { where: { id } });
  return await getAddressById(id);
};

// Delete address by ID
export const deleteAddress = async (id: number) => {
  return await Address.destroy({ where: { id } });
};