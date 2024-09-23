import Spinner from "@/assets/spinner.svg?react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Spinner />
      <h3>로딩중입니다.</h3>
    </div>
  );
}
