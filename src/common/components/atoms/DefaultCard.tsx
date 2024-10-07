export default function DefaultCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-[15px] border border-borders bg-foreground p-3 shadow-first">
      {children}
    </div>
  );
}
