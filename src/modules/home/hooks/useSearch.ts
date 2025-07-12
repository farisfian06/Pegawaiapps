// hooks/useSearchPagination.ts
import { useSearchParams } from "react-router-dom";
import type { Employee } from "../../../types/employee.types";

interface UseSearch {
  data: Employee[];
  itemsPerPage: number;
}

export const useSearch = ({ data, itemsPerPage }: UseSearch) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearch = (searchTerm: string) => {
    setSearchParams({ search: searchTerm, page: "1" });
  };

  const goToPage = (pageNum: number) => {
    setSearchParams({ search, page: pageNum.toString() });
  };

  return {
    search,
    page,
    filteredData,
    paginatedData,
    totalPages,
    handleSearch,
    goToPage,
  };
};
