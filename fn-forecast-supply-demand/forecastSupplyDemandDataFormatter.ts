import { convertToEpochTime, trimDate } from "../shared/utils/dateTime";

export interface GraphApiResponseData {
  value: number;
  applicableAt: string;
  applicableAtUkLocalTime: string;
  qualityIndicator: null;
  publicationObjectName: string;
  applicableFor: string;
  generatedTimeStamp: string;
  generatedTimeStampUkLocalTime: string;
  rawDisplayValue: string;
}

export interface SupplyDemandData {
  supply: Record<string, unknown>[];
  demand: Record<string, unknown>[];
}

export enum SupplyDemandPublicationObjectName {
  supply = "Supply",
  demand = "Demand",
}

export const forecastSupplyDemandDataFormatter = (
  forecastSupplyDemandData?: GraphApiResponseData[]
): SupplyDemandData => {
  if (!forecastSupplyDemandData) {
    return { supply: [], demand: [] };
  }

  const initialSupplyDemandData: SupplyDemandData = { supply: [], demand: [] };
  const transformedData = forecastSupplyDemandData.reduce((acc, dataItem) => {
    const { applicableAtUkLocalTime, publicationObjectName } = dataItem;
    const epochTime = convertToEpochTime(
      trimDate(applicableAtUkLocalTime, "hour")
    );

    const transformedDataItem = {
      ...dataItem,
      applicableAtUkLocalTime: epochTime,
    };
    if (publicationObjectName === SupplyDemandPublicationObjectName.supply) {
      acc.supply.push(transformedDataItem);
    }

    if (publicationObjectName === SupplyDemandPublicationObjectName.demand) {
      acc.demand.push(transformedDataItem);
    }

    return acc;
  }, initialSupplyDemandData);

  return transformedData;
};
