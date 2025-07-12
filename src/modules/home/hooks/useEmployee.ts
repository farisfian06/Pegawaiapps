import { useState, useEffect } from "react";
import type { Employee } from "../../../types/employee.types";
import type { EmployeePayload } from "../schema/employeeSchema";

export const useEmployee = () => {
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("EmployeeList");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const addEmployee = (employee: Employee) => {
    const updated = [...data, employee];
    console.log(employee);
    setData(updated);
    localStorage.setItem("EmployeeList", JSON.stringify(updated));
  };

  const addEmployeeFromForm = (employeeData: EmployeePayload) => {
    const newEmployee: Employee = {
      id: Date.now(),
      name: employeeData.name,
      phone: employeeData.phone,
      divisi: employeeData.divisi,
      posisi: employeeData.posisi,
    };
    addEmployee(newEmployee);
  };

  const editEmployee = (employeeData: EmployeePayload) => {
    const updated = data.map((employee) => {
      if (employee.id === employeeData.id) {
        return {
          ...employee,
          name: employeeData.name,
          phone: employeeData.phone,
          divisi: employeeData.divisi,
          posisi: employeeData.posisi,
        };
      }
      return employee;
    });
    setData(updated);
    localStorage.setItem("EmployeeList", JSON.stringify(updated));
  };

  const deleteEmployee = (id: number) => {
    const updated = data.filter((p) => p.id !== id);
    setData(updated);
    localStorage.setItem("EmployeeList", JSON.stringify(updated));
  };

  const addDummyEmployee = () => {
    const dummy: Employee = {
      id: Date.now(),
      name: "Agus Basudara",
      phone: "08123456789",
      divisi: "IT",
      posisi: "Staff",
    };
    addEmployee(dummy);
  };

  return {
    data,
    addEmployee,
    deleteEmployee,
    addDummyEmployee,
    addEmployeeFromForm,
    editEmployee,
  };
};
