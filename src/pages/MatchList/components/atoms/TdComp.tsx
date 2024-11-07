// TableCell.tsx
interface TdProps {
  children: React.ReactNode;
}

const TdComp = ({ children }: TdProps) => <td className="border px-4 py-2">{children}</td>;

export default TdComp;
