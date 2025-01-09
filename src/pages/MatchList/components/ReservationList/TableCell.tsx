interface TableCellProps {
  children: React.ReactNode;
}

const TableCell = ({ children }: TableCellProps) => (
  <td className="max-w-[150px] overflow-hidden truncate text-ellipsis border px-4 py-2">
    {children}
  </td>
);

export default TableCell;
