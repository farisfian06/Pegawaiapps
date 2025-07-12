import { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { useEmployee } from "./hooks/useEmployee";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import AddEmployeeModal from "./component/AddEmployeeModal";
import Table from "../../components/Table";
import EditEmployeeModal from "./component/EditEmployeeModal";
import type { EmployeePayload } from "./schema/employeeSchema";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const HomePage = () => {
  const {
    data,
    deleteEmployee,
    addDummyEmployee,
    addEmployeeFromForm,
    editEmployee,
  } = useEmployee();
  const { search, page, paginatedData, goToPage, handleSearch, totalPages } =
    useSearch({ data, itemsPerPage: ITEMS_PER_PAGE });

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeePayload | null>(null);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container">
          <div className="min-h-screen py-8 md:py-12 px-4 mx-auto">
            <Search
              value={search}
              onChange={handleSearch}
              onAddDummy={() => {
                addDummyEmployee();
              }}
              onAddEmployee={() => {
                setIsOpen(true);
              }}
            />
            <div className="w-full rounded-xl overflow-hidden">
              <Table hoverable>
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Phone</Table.HeadCell>
                    <Table.HeadCell>Division</Table.HeadCell>
                    <Table.HeadCell>Position</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Actions</span>
                    </Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((employee, idx) => (
                      <Table.Row>
                        <Table.Cell>
                          {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                        </Table.Cell>
                        <Table.Cell>{employee.name}</Table.Cell>
                        <Table.Cell>{employee.phone}</Table.Cell>
                        <Table.Cell>{employee.divisi}</Table.Cell>
                        <Table.Cell>{employee.posisi}</Table.Cell>
                        <Table.Cell className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsEditOpen(true);
                              setEditData(employee);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center">
                        Tidak ada data ditemukan.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
            <div className="mt-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          </div>
        </div>
      </section>

      <AddEmployeeModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        addEmployeeFromForm={addEmployeeFromForm}
      />
      <EditEmployeeModal
        editEmploye={editEmployee}
        onCancel={() => setIsEditOpen(false)}
        initialData={{
          id: editData?.id || 0,
          divisi: editData?.divisi || "",
          name: editData?.name || "",
          posisi: editData?.posisi || "",
          phone: editData?.phone || "",
        }}
        isOpen={isEditOpen}
      />
    </>
  );
};

export default HomePage;
