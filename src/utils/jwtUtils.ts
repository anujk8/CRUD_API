import { FastifyRequest, FastifyReply } from "fastify";
import { JWT } from "@fastify/jwt";

export const createToken =(reply:FastifyReply, payload:object) =>{
    return reply.jwtSign(payload);
};

export const verifyToken = async (req:FastifyRequest) => {
    try{
        const user = await req.jwtVerify<{id:Number;email:string}>();
        return user;
    }catch{
    throw new Error('Unauthorized');
    }
};



