import Modal from "react-modal";
import { IoIosCloseCircle } from "react-icons/io";
import barcord from "../assets/Barcode.svg";
import Button from "./Button";

interface InformationModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function InformationModal({ isOpen, onClose }: InformationModal) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // 모달 외부 클릭 시 닫히도록 설정
      className="fixed left-1/2 top-1/2 flex w-[560px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="mb-5 flex w-full justify-between border-b border-b-borders pb-1">
        <h1 className="font-semibold">예매 정보</h1>
        <button onClick={onClose}>
          <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
        </button>
      </div>
      <div className="drop-shadow-first mb-6 flex w-[380px] flex-col items-start rounded-[10px] bg-Accent px-[31px] py-[33px]">
        <div className="mb-4 w-full border-b-2 border-b-text-secondary pb-2 text-[20px] font-bold">
          전북 현대 모터스 vs 수원 삼성 블루윙즈
        </div>
        <div className="mb-2 flex flex-col">
          <div className="text-[14px] text-text-secondary">대구삼성라이온즈파크</div>
          <div className="text-[14px]">2024.07.22 18:30</div>
        </div>
        <img src={barcord} className="h-[30px]" />
      </div>
      <section className="flex w-[380px] flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-[16px] text-text-secondary">예매일</div>
            <div className="text-[16px]">2024.07.19</div>
          </div>
          <div className="flex flex-col">
            <div className="text-[16px] text-text-secondary">예매자</div>
            <div className="text-[16px]">홍길동</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-[16px] text-text-secondary">티켓상태</div>
            <div className="text-[16px]">예매완료</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[16px] text-text-secondary">결제금액</div>
            <div className="text-[16px]">173,000 원</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex w-3/4 flex-col">
            <div className="text-[16px] text-text-secondary">좌석</div>
            <div className="text-[16px]">
              3루 2열 3번, 3루 2열 4번, 3루 2열 4번 프리미엄 5열 50번, 프리미엄 5열 50번, 프리미엄
              5열 50번
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[16px] text-text-secondary">매수</div>
            <div className="text-[16px]">4 매</div>
          </div>
        </div>
        <Button content="티켓 취소" onClick={onClose} />
      </section>
    </Modal>
  );
}
