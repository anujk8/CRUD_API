// import { FastifyReply, FastifyRequest } from "fastify";
// import { authService } from "../services/auth.service.js";
// import { createToken, verifyToken } from "../utils/jwtUtils.js";
// import {
//   handleError,
//   handleSuccess,
//   responseError,
// } from "../utils/response.js";
export {};
// export const authController = {
//   signup: async (req: FastifyRequest, reply: FastifyReply) => {
//     try {
//       const { first_name,last_name, email, password } = req.body as any;
//       const user = await authService.register(first_name,last_name, email, password);
//       return handleSuccess(reply, "User registered successfully", {
//         id: id,
//       });
//     } catch (error: any) {
//       return handleError(reply, error.message);
//     }
//   },
//   login: async (req: FastifyRequest, reply: FastifyReply) => {
//     try {
//       const { email, password } = req.body as any;
//       const user = await authService.login(email, password);
//       const token = await createToken(reply, {
//         id: user.id,
//         email: user.email,
//       });
//       reply.setCookie("token", token, {
//         httpOnly: true,
//         path: "/",
//         maxAge: 3600,
//       });
//       return handleSuccess(reply, "Login successful", { token });
//     } catch (error: any) {
//       return handleError(reply, error.message);
//     }
//   },
//   logout: async (_req: FastifyRequest, reply: FastifyReply) => {
//     reply.clearCookie("token");
//     return handleSuccess(reply, "Logged out successfully");
//   },
//   me: async (req: FastifyRequest, reply: FastifyReply) => {
//     try {
//       const user = await verifyToken(req);
//       return handleSuccess(reply, "User verified", { user });
//     } catch (error: any) {
//       return responseError(reply, error.message, 401);
//     }
//   },
// };
