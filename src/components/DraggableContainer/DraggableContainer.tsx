import { useState } from "react";
import "./draggable-container.css";

const SCROLL_STEP = 50;

export const DraggableContainer = ({
  children,
  zoom,
  boxPosition,
  setBoxPosition,
}: any) => {
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    setDragging(true);
    setDragOffset({
      x: e.clientX - boxPosition.x,
      y: e.clientY - boxPosition.y,
    });
  };

  const handleMouseMove = (e: any) => {
    if (dragging) {
      setBoxPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleUpArrow = () => {
    setBoxPosition({ x: boxPosition.x, y: boxPosition.y + SCROLL_STEP });
  };

  const handleDownArrow = () => {
    setBoxPosition({ x: boxPosition.x, y: boxPosition.y - SCROLL_STEP });
  };

  const handleLeftArrow = () => {
    setBoxPosition({ x: boxPosition.x + SCROLL_STEP, y: boxPosition.y });
  };

  const handleRightArrow = () => {
    setBoxPosition({ x: boxPosition.x - SCROLL_STEP, y: boxPosition.y });
  };

  const boxStyle: any = {
    position: "absolute",
    top: `${boxPosition.y}px`,
    left: `${boxPosition.x}px`,
  };

  const containerStyle: any = {
    position: "relative",
    width: "1000vw",
    height: "100%",
    overflow: "hidden",
    transform: `scale(${zoom})`,
    transformOrigin: "top left",
  };

  return (
    <div style={containerStyle}>
      <button className="arrow__btn arrow_btn__up" onClick={handleUpArrow}>
        <i className="arrow_up" />
      </button>
      <button className="arrow__btn arrow_btn__down" onClick={handleDownArrow}>
        <i className="arrow_down" />
      </button>
      <button className="arrow__btn arrow_btn__left" onClick={handleLeftArrow}>
        <i className="arrow_left" />
      </button>
      <button
        className="arrow__btn arrow_btn__right"
        onClick={handleRightArrow}
      >
        <i className="arrow_right" />
      </button>
      <div
        style={boxStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableContainer;
