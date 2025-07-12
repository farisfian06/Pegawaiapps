import React from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onAddDummy: () => void;
  onAddEmployee: () => void;
}

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onAddDummy,
  onAddEmployee,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 w-full flex flex-col md:flex-row justify-between items-center gap-4">
      <input
        type="text"
        placeholder="Cari nama..."
        value={value}
        onChange={handleInputChange}
        className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full md:w-1/3 
        focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400"
      />
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg w-full sm:w-auto
          hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors duration-200
          dark:bg-primary/90"
          onClick={onAddDummy}
        >
          Add Dummy
        </button>
        <button
          onClick={onAddEmployee}
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 
          px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 
          transition-colors duration-200 w-full sm:w-auto
          bg-white dark:bg-gray-800 font-medium"
        >
          Add employee
        </button>
      </div>
    </div>
  );
};

export default Search;
