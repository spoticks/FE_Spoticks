const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="mt-4 flex justify-center">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`mx-1 px-4 py-2 ${
          currentPage === i + 1
            ? "rounded-[10px] bg-Accent text-white"
            : "rounded-[10px] bg-borders"
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);
export default Pagination;
