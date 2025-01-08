interface TableHeaderProps {
  columns: string[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className={`border px-4 py-2 text-text-primary opacity-50 ${
              column === "" ? "border-none bg-none" : "bg-foreground"
            }`}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
