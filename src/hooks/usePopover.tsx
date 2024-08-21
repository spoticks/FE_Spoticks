import { useState, useRef, useEffect } from "react";

export default function usePopover() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleClickProfile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsPopoverOpen(!isPopoverOpen);
  }
  const popoverRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsPopoverOpen(false);
    }
  }
  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return { handleClickProfile, popoverRef, isPopoverOpen, setIsPopoverOpen };
}
