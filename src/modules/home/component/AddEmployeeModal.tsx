import React from "react";
import { FiUser } from "react-icons/fi";
import Input from "../../../components/Input";
import { useAddEmployee } from "../hooks/useAddEmployee";
import type { EmployeePayload } from "../schema/employeeSchema";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  addEmployeeFromForm: (data: EmployeePayload) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onCancel,
  addEmployeeFromForm,
}) => {
  const { form, onSubmit } = useAddEmployee(onCancel, addEmployeeFromForm);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 dark:bg-black/60">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full max-h-[calc(100vh-200px)] overflow-auto">
        <div className="mx-auto mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-primary border-purple-200  border-4 text-slate-50">
          <FiUser className="size-7" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
          Add employee data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
          Fill in employee information to add new employee to the system.
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <Input
            {...form.register("name")}
            label="Name"
            placeholder="Enter employee name"
            error={form.formState.errors.name?.message}
          />
          <Input
            {...form.register("phone")}
            label="Phone"
            placeholder="Enter employee phone number"
            error={form.formState.errors.phone?.message}
          />
          <Input
            {...form.register("divisi")}
            label="Division"
            placeholder="Enter employee division"
            error={form.formState.errors.divisi?.message}
          />
          <Input
            {...form.register("posisi")}
            label="Position"
            placeholder="Enter employee position"
            error={form.formState.errors.posisi?.message}
          />
          <div className="mt-4 flex justify-between gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 grow rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 grow rounded-lg bg-primary text-white hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors"
            >
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
