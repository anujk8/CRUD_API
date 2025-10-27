export const sendSuccess = (
  reply: any,
  data: any = null,
  message :string = "success",
  code : number = 200
) => {
  return reply.code(code).send({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  reply: any,
  message :string =  "something went wrong",
  code : number = 400,
  data: any = null
) => {
  return reply.code(code).send({
    success: false,
    message,
    data,
  });
};

export const handleError = (error: any, reply: any) => {
  console.error("Error : ", error);
  const message = error?.message || "Internal Server Error";
  const code = error?.statusCode || 500;

  return reply.code(code).send({
    success: false,
    message,
    data:null,
  });
};
