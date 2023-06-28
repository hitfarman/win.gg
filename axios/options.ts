import { IAllOptionsResponse } from "@/interfaces/options";
import { apiSSR } from "./init";

export const getAllOptions = async (): Promise<IAllOptionsResponse> => {
  const response = await apiSSR.get<IAllOptionsResponse>("/options/all");
  return response.data;
};
