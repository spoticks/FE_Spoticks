export default function HeaderNav() {
  const menu = ["HOME", "야구", "축구", "배구", "농구"];
  return (
    <nav className="m-auto flex w-60 flex-row justify-between">
      {menu.map((el) => (
        <div className="text-[18px] font-medium">{el}</div>
      ))}
    </nav>
  );
}
