import { AzureFunction, Context } from "@azure/functions";
import { responseFactory } from "../shared/utils/responseFactory";
import axios from "axios";
import { forecastSupplyDemandDataFormatter } from "./forecastSupplyDemandDataFormatter";
import httpTriggerErrorWrapper from "../shared/httpTriggerErrorWrapper";

const httpTrigger: AzureFunction = async function (
  context: Context
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  const {
    data: { data },
  } = await axios.get(
    "https://mip-prd-web.azurewebsites.net/api/WithinDayForecastSupplyAndDemand?currentUtcDateTimeOverride"
  );

  const formattedData = forecastSupplyDemandDataFormatter(data);

  context.res = responseFactory({
    data: formattedData,
  });
};

export default httpTriggerErrorWrapper(httpTrigger);
