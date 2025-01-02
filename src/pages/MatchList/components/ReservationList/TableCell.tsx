interface TableCellProps {
  children: React.ReactNode;
}

const TableCell = ({ children }: TableCellProps) => (
  <td className="border px-4 py-2">{children}</td>
);

export default TableCell;
