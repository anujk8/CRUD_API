export const createToken = (reply, payload) => {
    return reply.jwtSign(payload);
};
export const verifyToken = async (req) => {
    try {
        const user = await req.jwtVerify();
        return user;
    }
    catch {
        throw new Error('Unauthorized');
    }
};
