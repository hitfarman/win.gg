import { IAllOptionsResponse } from "@/interfaces/options";
import { apiNext } from "./init";

export const getAllOptions = async (): Promise<
  IAllOptionsResponse["options"]
> => {
  const response = await apiNext.get<IAllOptionsResponse>("/options");
  return response.data.options;
};
