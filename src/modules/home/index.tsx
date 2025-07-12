import { FiUsers, FiGrid } from "react-icons/fi";
import { useDivisions } from "../division/hooks/useDivision";
import { useEmployees } from "../employee/hooks/useEmployee";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: dataEmployee, isLoading: isLoadingEmployee } = useEmployees();
  const { data: dataDivision, isLoading: isLoadingDivision } = useDivisions();

  console.log(dataEmployee?.data.employees);

  return (
    <section className="dark:bg-gray-900">
      <div className="container py-12 min-h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Stats Card */}
          <Link
            to="/employees"
            className="block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-tertiary rounded-full">
                  <FiUsers className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-gray-600 dark:text-gray-400 text-sm">
                    Total Employees
                  </h2>
                  <p className="text-2xl font-semibold dark:text-white">
                    {isLoadingEmployee ? (
                      <span className="text-gray-400 dark:text-gray-500">
                        Loading...
                      </span>
                    ) : (
                      dataEmployee?.data.employees.length || 0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Division Stats Card */}
          <Link
            to="/divisions"
            className="block transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-tertiary rounded-full">
                  <FiGrid className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-gray-600 dark:text-gray-400 text-sm">
                    Total Divisions
                  </h2>
                  <p className="text-2xl font-semibold dark:text-white">
                    {isLoadingDivision ? (
                      <span className="text-gray-400 dark:text-gray-500">
                        Loading...
                      </span>
                    ) : (
                      dataDivision?.data.divisions.length || 0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
