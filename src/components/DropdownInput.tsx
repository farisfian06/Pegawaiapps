import React, { type SelectHTMLAttributes, useState, useEffect } from "react";
import clsx from "clsx";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface DropdowninputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  width?: "w-full" | "w-fit";
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string; // Tambahkan prop value untuk controlled component
}

const DropdownInput: React.FC<DropdowninputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  required = false,
  width = "w-full",
  options,
  placeholder = "Select an option",
  onChange,
  disabled,
  value: controlledValue, // Rename untuk menghindari konflik
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(controlledValue || "");

  // Sync dengan controlled value
  useEffect(() => {
    setSelectedValue(controlledValue || "");
  }, [controlledValue]);

  const handleSelect = (value: string) => {
    if (disabled) return;
    setSelectedValue(value);
    setIsOpen(false);

    if (onChange) {
      const syntheticEvent = {
        target: {
          value: value,
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  // Fungsi untuk mendapatkan label berdasarkan value
  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder;
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          className={clsx(
            "relative w-full bg-white dark:bg-gray-800 border rounded-lg pl-4 pr-10 py-2.5 text-left cursor-pointer",
            "focus:outline-none focus:ring-2 transition-all duration-200",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 dark:border-gray-600 focus:bg-primary focus:ring-indigo-500/20",
            disabled &&
              "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700",
            width,
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span
            className={
              selectedValue
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }
          >
            {getSelectedLabel()}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            {isOpen ? (
              <HiChevronUp className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            ) : (
              <HiChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            )}
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  "px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50",
                  selectedValue === option.value
                    ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-900 dark:text-gray-100"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        <select
          id={id}
          className="sr-only"
          value={selectedValue}
          disabled={disabled}
          onChange={(e) => handleSelect(e.target.value)}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default DropdownInput;
