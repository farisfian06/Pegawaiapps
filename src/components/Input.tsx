import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary
          dark:bg-gray-800 dark:text-white
          ${
            error
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          }
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};

export default Input;
