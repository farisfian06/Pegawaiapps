import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDivisions } from "./hooks/useDivision";
import Table from "../../components/Table";

const ITEMS_PER_PAGE = 10;

const DivisonPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isFetching, isError } = useDivisions({
    name: debouncedSearch,
    page,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container">
          <div className="min-h-screen py-8 md:py-12 px-4 mx-auto">
            <div className="flex w-full justify-between">
              <input
                type="text"
                placeholder="Cari nama..."
                value={search}
                onChange={handleSearch}
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full md:w-1/3 
                focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="w-full rounded-xl overflow-hidden mt-4">
              {isError ? (
                <div className="text-center text-red-500 dark:text-red-400 py-4">
                  Error loading data. Please try again later.
                </div>
              ) : isLoading || isFetching ? (
                <div className="text-center py-4 text-gray-700 dark:text-gray-300">
                  Loading...
                </div>
              ) : (
                <Table hoverable>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeadCell>
                        <p>No</p>
                      </Table.HeadCell>
                      <Table.HeadCell>Name</Table.HeadCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {data?.data.divisions && data.data.divisions.length > 0 ? (
                      data.data.divisions.map((division, idx) => (
                        <Table.Row key={division.id}>
                          <Table.Cell className="w-fit">
                            <p>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</p>
                          </Table.Cell>
                          <Table.Cell>{division.name}</Table.Cell>
                        </Table.Row>
                      ))
                    ) : (
                      <Table.Row>
                        <Table.Cell colSpan={6} className="text-center">
                          No data found.
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              )}
            </div>
            {!isLoading && !isError && data && (
              <div className="mt-4">
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded disabled:opacity-50 transition-colors duration-200"
                  >
                    Prev
                  </button>
                  <span className="flex items-center text-gray-900 dark:text-gray-100">
                    Page {data.pagination.current_page} of{" "}
                    {data.pagination.last_page}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= (data.pagination.last_page || 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded disabled:opacity-50 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DivisonPage;
