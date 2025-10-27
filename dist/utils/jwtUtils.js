export const createToken = (reply, payload) => {
    return reply.jwtSign(payload);
};
