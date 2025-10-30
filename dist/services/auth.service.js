// import { User } from '../models/user.model.js';
// import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
export {};
// export const authService = {
//   async register(first_name: string,last_name:string, email: string, password: string) {
//     const existing = await User.findOne({ where: { email } });
//     if (existing) throw new Error('Email already registered');
//     const hashed = hashPassword(password);
//     const user = await User.create({ first_name,last_name, email, password: hashed });
//     return user;
//   },
//   async login(email: string, password: string) {
//     const user = await User.findOne({ where: { email } });
//     if (!user) throw new Error('Invalid email');
//     const isValid = comparePassword(password, user.password);
//     if (!isValid) throw new Error('Invalid password');
//     return user;
//   },
// };
