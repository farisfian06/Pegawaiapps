import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axios";

export type Division = {
  id: string;
  name: string;
};

export type DivisionResponse = {
  status: string;
  message: string;
  data: {
    divisions: Division[];
  };
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type Params = {
  name?: string;
  page?: number;
};

const fetchDivisions = async (params?: Params) => {
  const name = params?.name || "";
  const page = params?.page || 1;

  const response = await axiosInstance.get<DivisionResponse>(
    `/divisions?name=${name}&page=${page}`
  );
  return response.data;
};

export const useDivisions = (params?: Params) => {
  const name = params?.name || "";
  const page = params?.page || 1;

  return useQuery({
    queryKey: ["divisions", name, page],
    queryFn: () => fetchDivisions(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
