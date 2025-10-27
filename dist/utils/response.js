export const sendSuccess = (reply, data = null, message = "success", code = 200) => {
    return reply.code(code).send({
        success: true,
        message,
        data,
    });
};
export const sendError = (reply, message = "something went wrong", code = 400, data = null) => {
    return reply.code(code).send({
        success: false,
        message,
        data,
    });
};
export const handleError = (error, reply) => {
    console.error("Error : ", error);
    const message = error?.message || "Internal Server Error";
    const code = error?.statusCode || 500;
    return reply.code(code).send({
        success: false,
        message,
        data: null,
    });
};
