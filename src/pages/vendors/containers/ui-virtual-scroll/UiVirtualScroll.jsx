import { useRef, useState } from "react";

export const UiVirtualScroll = ({
  offset = 0,
  buffer,
  limit,
  rowHeight,
  height,
  onPrevCallback,
  onNextCallback,
  children,
}) => {
  const overlayRef = useRef(null);
  const [upperBoundary, setUpperBoundary] = useState(offset);
  const [lowerBoundary, setLowerBoundary] = useState(offset + 2);
  const [isLoading, setIsLoading] = useState(false);
  const [currentScrollTopPosition, setCurrentScrollTopPosition] = useState(0);

  const handleScroll = async (target) => {
    if (isLoading) {
      return;
    }

    const scrollTop = Math.round(target.scrollTop);
    const clientHeight = Math.round(target.clientHeight);
    const scrollHeight = Math.round(target.scrollHeight);
    console.log(scrollTop, clientHeight, scrollHeight);

    // defining if we currently scrolling up or down
    const isUp = scrollTop < currentScrollTopPosition;

    if (isUp && scrollTop === 0) {
      setIsLoading(true);

      await onPrevCallback(upperBoundary - 1);
      setUpperBoundary(upperBoundary - 1);
      setLowerBoundary(lowerBoundary - 1);

      if (overlayRef !== null) {
        const scrollPos = limit * rowHeight;
        overlayRef.current.scrollTo(0, scrollPos);
      }
      setIsLoading(false);
    } else if (!isUp && scrollTop + clientHeight >= scrollHeight) {
      setIsLoading(true);

      await onNextCallback(lowerBoundary);
      setUpperBoundary(upperBoundary + 1);
      setLowerBoundary(lowerBoundary + 1);

      if (overlayRef !== null) {
        const scrollPos = limit * rowHeight;
        overlayRef.current.scrollTo(0, scrollPos * 2);
      }
      setIsLoading(false);
    }
    setCurrentScrollTopPosition(scrollTop);
  };

  return (
    <div
      ref={overlayRef}
      style={{ overflow: "scroll", height }}
      onScroll={(e) => handleScroll(e.target)}
    >
      {children}
    </div>
  );
};
