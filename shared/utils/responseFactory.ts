export interface ResponseBody {
  data?: unknown;
  errors?: ResponseBodyError[];
}

export interface ResponseBodyError {
  code?: string;
  message: string;
}

export interface FunctionResponse {
  statusCode: number;
  body: ResponseBody;
  headers: Record<string, string>;
}

export function responseFactory(
  body: ResponseBody,
  httpCode = 200
): FunctionResponse {
  return {
    statusCode: httpCode,
    body,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}

export function errorResponse(message: string): FunctionResponse {
  return {
    statusCode: 500,
    body: {
      errors: [
        {
          message,
        },
      ],
    },
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}
