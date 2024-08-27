import spinner from "../assets/spinner.svg";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <h3>로딩중입니다.</h3>
      <img src={spinner} alt="loading" />
    </div>
  );
}
