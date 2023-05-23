import { useState } from "react";
import "./header.css";
import btnCenter from "../../image/navigation-cursor-svgrepo-com.svg";

interface HeaderProps {
  title: string;
  currentZoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  customZoom: (zoom: number) => void;
  handleButtonCenter: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  currentZoom,
  zoomIn,
  zoomOut,
  customZoom,
  handleButtonCenter,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderZoomOptions = () => {
    const options = [];
    for (let i = 10; i <= 200; i += 10) {
      options.push(
        <option key={i} value={i}>
          {i}%
        </option>
      );
    }
    return options;
  };

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__right">
        <div className="listView ">list view</div>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonCenter}
          className="centerBtn"
        >
          <img className="arrowImg" src={btnCenter} alt="centred-btn" />
          {showTooltip && <span className="tooltip">Go center</span>}
        </button>

        <div className="btnZoomWrap">
          <button className="btnZoom" onClick={zoomOut}>
            -
          </button>
          <select
            className="selectList"
            value={Math.floor(currentZoom * 100)}
            onChange={(e) => customZoom(+e.target.value)}
          >
            {renderZoomOptions()}
          </select>

          <button className="btnZoom" onClick={zoomIn}>
            +
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
