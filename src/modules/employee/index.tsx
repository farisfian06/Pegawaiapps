import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDeleteEmployee } from "./hooks/useDeleteEmployee";
import { useEmployees } from "./hooks/useEmployee";
import type { EmployeePayload } from "./schema/employeeSchema";
import Table from "../../components/Table";
import { FiEdit2, FiImage, FiTrash2 } from "react-icons/fi";
import AddEmployeeModal from "./component/AddEmployeeModal";
import EditEmployeeModal from "./component/EditEmployeeModal";

const ITEMS_PER_PAGE = 10;

const EmployeePage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isFetching, isError } = useEmployees({
    name: debouncedSearch,
    page,
  });
  const { isDeleteLoading, onSubmit } = useDeleteEmployee();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeePayload | null>(null);
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
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 
          px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 
          transition-colors duration-200 w-full sm:w-auto
          bg-white dark:bg-gray-800 font-medium"
              >
                Add employee
              </button>
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
                      <Table.HeadCell>No</Table.HeadCell>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Phone</Table.HeadCell>
                      <Table.HeadCell>Division</Table.HeadCell>
                      <Table.HeadCell>Position</Table.HeadCell>
                      <Table.HeadCell>Image</Table.HeadCell>
                      <Table.HeadCell>
                        <span className="sr-only">Actions</span>
                      </Table.HeadCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {data?.data.employees && data.data.employees.length > 0 ? (
                      data.data.employees.map((employee, idx) => (
                        <Table.Row key={employee.id}>
                          <Table.Cell>
                            {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                          </Table.Cell>
                          <Table.Cell>{employee.name}</Table.Cell>
                          <Table.Cell>{employee.phone}</Table.Cell>
                          <Table.Cell>{employee.division.name}</Table.Cell>
                          <Table.Cell>{employee.position}</Table.Cell>
                          <Table.Cell>
                            <button
                              onClick={() =>
                                window.open(employee.image, "_blank")
                              }
                              className="p-2 bg-secondary rounded-full hover:bg-secondary/70 transition-colors duration-200"
                            >
                              <FiImage className="w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                            </button>
                          </Table.Cell>
                          <Table.Cell className="flex gap-2">
                            <button
                              onClick={() => {
                                setIsEditOpen(true);
                                setEditData({
                                  id: employee.id,
                                  name: employee.name,
                                  phone: employee.phone,
                                  division: employee.division.id,
                                  position: employee.position,
                                  image: employee.image,
                                });
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => {
                                onSubmit({ id: employee.id });
                              }}
                              disabled={isDeleteLoading}
                              className={`text-red-600 hover:text-red-800 ${
                                isDeleteLoading
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </Table.Cell>
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
      <AddEmployeeModal isOpen={isOpen} onCancel={() => setIsOpen(false)} />
      <EditEmployeeModal
        onCancel={() => setIsEditOpen(false)}
        initialData={{
          id: editData?.id || "",
          division: editData?.division || "",
          name: editData?.name || "",
          position: editData?.position || "",
          phone: editData?.phone || "",
          image: editData?.image,
        }}
        isOpen={isEditOpen}
      />
    </>
  );
};

export default EmployeePage;
