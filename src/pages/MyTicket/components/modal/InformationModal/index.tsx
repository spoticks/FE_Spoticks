import Modal from "react-modal";
import InformationDetail from "@/pages/MyTicket/components/modal/InformationModal/InformationDetail";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ModalHeader from "@/common/components/molecules/ModalHeader";

interface InformationModal {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
}

export default function InformationModal({ isOpen, onClose, reservationId }: InformationModal) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 flex min-h-[30rem] w-88 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[30px] border border-borders bg-foreground p-[40px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <ModalHeader onCloseButtonClick={onClose} content="예매 정보" />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={reset}
          resetKeys={[location.pathname]}
        >
          <InformationDetail onClose={onClose} reservationId={reservationId} />
        </ErrorBoundary>
      </Suspense>
    </Modal>
  );
}
