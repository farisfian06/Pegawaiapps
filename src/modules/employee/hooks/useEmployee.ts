import axiosInstance from "../../../api/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Employee = {
  id: string;
  image: string;
  name: string;
  phone: string;
  division: {
    id: string;
    name: string;
  };
  position: string;
};

export type EmployeeResponse = {
  status: string;
  message: string;
  data: {
    employees: Employee[];
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

const fetchEmployees = async (params?: Params) => {
  const name = params?.name || "";
  const page = params?.page || 1;

  const response = await axiosInstance.get<EmployeeResponse>(
    `/employees?name=${name}&page=${page}`
  );
  return response.data;
};

export const useEmployees = (params?: Params) => {
  const name = params?.name || "";
  const page = params?.page || 1;

  return useQuery({
    queryKey: ["employees", name, page],
    queryFn: () => fetchEmployees(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
