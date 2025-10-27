import { FastifyRequest, FastifyReply } from "fastify";
import { JWT } from "fastify-jwt";

export const createToken =(reply:FastifyReply, payload:object) =>{
    return reply.jwtSign(payload);
}



