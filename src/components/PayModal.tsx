import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import Error from "../pages/Error";
import { MatchDataProps } from "../common/types/type";
import { useNavigate } from "react-router-dom";
import Button from "@/common/components/atoms/Button";
import Loading from "@/common/components/atoms/Loading";
import SuccessToast from "@/common/components/atoms/SuccessToast";

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
  mySeats: string[];
  matchData: MatchDataProps;
  totalPay: string;
}

interface PayFormInputs {
  totalPrice: string;
  seatIds: string[];
}

export default function PayModal({
  isOpen,
  onClose,
  gameId,
  mySeats,
  matchData,
  totalPay,
}: PayModalProps) {
  const navigate = useNavigate();

  const fetchPayDetails = async ({ totalPrice, seatIds }: PayFormInputs) => {
    // http://localhost:3000/games/${gameId}/reserve
    const { data } = await axios.post(`http://localhost:3000/pay`, {
      totalPrice,
      seatIds,
    });
    return data;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => fetchPayDetails({ totalPrice: totalPay, seatIds: mySeats }),
    onSuccess: (data) => {
      console.log("Reservation successful:", data);
      onClose();
      SuccessToast({ title: "결제 완료!" });
      navigate("/");
    },
    onError: (error) => {
      console.error("Reservation failed:", error);
    },
  });

  const handlePayClick = () => {
    mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 flex min-h-[771px] w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <div className="mb-5 flex w-full justify-between border-b border-b-borders pb-1">
        <h1 className="font-semibold">선택 정보</h1>
        <button onClick={onClose}>
          <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
        </button>
      </div>
      <section>
        {isPending && <Loading />}
        {error && <Error />}
        {matchData && (
          <>
            <div
              className={`mb-6 flex w-[380px] flex-col items-start rounded-[10px] bg-Accent px-[31px] py-[33px] drop-shadow-first`}
            >
              <h2 className="mb-4 w-full border-b-2 border-b-text-secondary pb-2 text-[20px] font-bold">
                {matchData.homeTeamName} vs {matchData.awayTeamName}
              </h2>
              <div className="mb-2 flex flex-col">
                <div className="text-[14px] text-text-secondary">{matchData.stadiumName}</div>
                <div className="text-[14px]">
                  {matchData.gameStartTime.split("T")[0].split("-").join(":")}{" "}
                  {matchData.gameStartTime.split("T")[1].slice(0, 5)}
                </div>
              </div>
              <div className="flex w-full justify-end font-bold">
                총 {mySeats.length} 매 {totalPay}원
              </div>
              {/* <img src={barcode} className="h-[30px]" /> */}
            </div>
            <div className="flex w-[380px] flex-col gap-4">
              <div className="flex justify-between">
                <InfoPart heading="연락처" content={"010-1234-5678"} />
                <InfoPart heading="예매자" content={"홍길동"} isRight />
              </div>
              <div className="flex">
                <InfoPart heading="좌석" content={mySeats.join(", ")} isSeat />
              </div>
              <Button content={"결제하기"} onClick={handlePayClick} />
            </div>
          </>
        )}
      </section>
    </Modal>
  );
}

function InfoPart({
  heading,
  content,
  isRight,
  isSeat,
}: {
  heading: string;
  content: string;
  isRight?: true;
  isSeat?: true;
}) {
  return (
    <div className={`flex flex-col ${isSeat && "w-3/4"} ${isRight && "items-end"}`}>
      <div className="text-[16px] text-text-secondary">{heading}</div>
      <div className={`text-[16px] ${isSeat && "break-keep"}`}>{content}</div>
    </div>
  );
}
