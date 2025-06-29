//We are going to declare all status codes and messages we need.


enum StatusCode {
    SUCCESS=200,
    CREATED=201,
    ACCEPTED=202,
    NO_CONTENT=204,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500,
    SERVER_UNAVAILABLE=503
  }

  const StatusMessage: Record<StatusCode, string> = {
      [StatusCode.SUCCESS]: "Success.",
      [StatusCode.CREATED]: "Resource created.",
      [StatusCode.ACCEPTED]: "Request accepted.",
      [StatusCode.NO_CONTENT]: "No content.",
      [StatusCode.BAD_REQUEST]: "Bad request.",
      [StatusCode.UNAUTHORIZED]: "Unauthorized.",
      [StatusCode.NOT_FOUND]: "Not found.",
      [StatusCode.INTERNAL_SERVER_ERROR]: "Internal server error.",
      [StatusCode.SERVER_UNAVAILABLE]: "Service unavailable.",
    };



    export {
      StatusCode ,
      StatusMessage
    }
