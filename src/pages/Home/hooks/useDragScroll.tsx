import { useRef, useState } from "react";

export default function useDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [totalX, setTotalX] = useState<number>(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const x = e.clientX;
    if (containerRef.current && "scrollLeft" in containerRef.current) {
      setTotalX(x + containerRef.current.scrollLeft);
    }
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const scrollLeft = totalX - e.clientX;

    if (containerRef.current && "scrollLeft" in containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft;
    }
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    if (!containerRef.current) return;

    setIsDragging(false);
  };

  return {
    containerRef,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
}
