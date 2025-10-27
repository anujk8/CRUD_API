import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";


export const getAllUsersWithAddress = async () => {
  return await User.findAll({
    include: [{ model: Address }],
  });
};

export const getAllAddressesWithPincode = async (pincode?: string) => {
  const whereClause = pincode ? { pincode } : {};
  const addresses = await Address.findAll({
    where: whereClause
    
  });
  return addresses;
};
