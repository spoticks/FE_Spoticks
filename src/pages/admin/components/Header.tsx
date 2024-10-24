import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="flex text-2xl font-bold">등록된 경기 목록</h1>
      <Link
        to="/admin/registration"
        state={{ mode: "create" }}
        className="cursor-pointer rounded-[10px] bg-Accent px-3 py-2 text-white hover:opacity-75"
      >
        등록하기
      </Link>
    </div>
  );
};

export default Header;
