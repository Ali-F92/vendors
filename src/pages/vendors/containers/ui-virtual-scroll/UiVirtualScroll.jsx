import { useRef, useState } from "react";

export const UiVirtualScroll = ({
  offset = 0,
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

    // defining if we currently scrolling up or down
    const isUp = scrollTop < currentScrollTopPosition;

    if (isUp && upperBoundary > 0 && scrollTop <= limit * rowHeight) {
      setIsLoading(true);

      setUpperBoundary(upperBoundary - 1);
      setLowerBoundary(lowerBoundary - 1);
      await onPrevCallback(upperBoundary - 1);

      if (overlayRef !== null) {
        const scrollPos = limit * rowHeight;
        overlayRef.current.scrollTo(0, scrollPos);
      }
      setIsLoading(false);
    } else if (!isUp && scrollTop >= 2 * limit * rowHeight - clientHeight) {
      setIsLoading(true);

      setUpperBoundary(upperBoundary + 1);
      setLowerBoundary(lowerBoundary + 1);
      await onNextCallback(lowerBoundary + 1);

      if (overlayRef !== null) {
        const scrollPos = limit * rowHeight;
        overlayRef.current.scrollTo(0, scrollPos - clientHeight);
      }
      setIsLoading(false);
    }
    setCurrentScrollTopPosition(Math.round(target.scrollTop));
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
