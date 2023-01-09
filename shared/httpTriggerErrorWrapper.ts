import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { responseFactory } from "./utils/responseFactory";

const httpTriggerErrorWrapper = function (
  fn: AzureFunction
): (...args: any[]) => Promise<void> {
  return async function (context: Context, req: HttpRequest) {
    try {
      await fn(context, req);
    } catch (error) {
      context.log(error);

      if (error instanceof Error) {
        context.res = responseFactory(
          {
            data: error.message,
          },
          500
        );
      }
    }
  };
};

export default httpTriggerErrorWrapper;
