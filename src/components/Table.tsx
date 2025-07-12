import React, { type ReactNode } from "react";

export interface TableProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  striped?: boolean;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export interface TableCellProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

export const Table: React.FC<TableProps> & {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  HeadCell: React.FC<TableCellProps>;
  Cell: React.FC<TableCellProps>;
} = ({ children, className = "", hoverable = false, striped = false }) => {
  const baseClass = "w-full text-left text-sm dark:text-gray-200";
  const stripedClass = striped
    ? "[&>tbody>tr:nth-child(even)]:bg-gray-50 dark:[&>tbody>tr:nth-child(even)]:bg-gray-800"
    : "";
  const hoverableClass = hoverable
    ? "[&>tbody>tr:hover]:bg-gray-100 dark:[&>tbody>tr:hover]:bg-gray-700"
    : "";

  return (
    <div className="overflow-x-auto relative">
      <table
        className={`${baseClass} ${stripedClass} ${hoverableClass} ${className}`}
      >
        {children}
      </table>
    </div>
  );
};

const TableHead: React.FC<TableHeadProps> = ({ children, className = "" }) => {
  return (
    <thead
      className={`text-xs uppercase text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className = "" }) => {
  return (
    <tr
      className={`bg-white dark:bg-gray-900 border-b dark:border-gray-700 ${className}`}
    >
      {children}
    </tr>
  );
};

const TableHeadCell: React.FC<TableCellProps> = ({
  children,
  className = "",
  colSpan,
}) => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 ${className} bg-gray-200 dark:bg-gray-800`}
      colSpan={colSpan}
    >
      {children}
    </th>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
  colSpan,
}) => {
  return (
    <td
      className={`px-6 py-4 dark:text-gray-300 ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;

export default Table;
