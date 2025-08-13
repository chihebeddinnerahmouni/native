import { ComplianceDto } from "../../backend/casaikos-api";
import { AxiosInstance } from "../../utils";

export const updateComplianceHandler = async (options: {
  propertyId: string;
  values: ComplianceDto;
}) => {
  const response =
    await AxiosInstance.propertyCompliances.complianceControllerAddOrUpdate(
      options.propertyId,
      options.values
    );
  return response.data;
};
