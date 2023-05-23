import "./category-button.css";

const closeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 96 960 960"
    width="20"
    fill="currentColor"
  >
    <path d="m291 848-83-83 189-189-189-189 83-83 189 189 189-189 83 83-189 189 189 189-83 83-189-189-189 189Z" />
  </svg>
);

const editSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 96 960 960"
    width="20"
    fill="currentColor"
  >
    <path d="M213 853h43l326-327-43-43-326 327v43Zm568-384L597 284l21-22q39-40 91.5-40.5T802 260l25 25q32 30 29 71t-31 69l-44 44Zm-58 58L298 952H113V768l425-425 185 184Zm-161-22-23-22 43 43-20-21Z" />
  </svg>
);

const plusSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 96 960 960"
    width="20"
    fill="currentColor"
  >
    <path d="M421 839V635H217V517h204V313h118v204h204v118H539v204H421Z" />
  </svg>
);

const doneSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 96 960 960"
    width="20"
    fill="currentColor"
  >
    <path d="M395 803 194 601l83-83 118 117 288-287 83 84-371 371Z" />
  </svg>
);

const CategoryButton: React.FC<{
  type: "plus" | "edit" | "close" | "done";
  color?: "success" | "warn" | "error";
  onClick: (event: any) => void;
}> = ({ type, color, onClick }) => {
  return (
    <>
      {type === "plus" && (
        <div className={"category-button " + color} onClick={onClick}>
          {plusSvg}
        </div>
      )}
      {type === "edit" && (
        <div className={"category-button " + color} onClick={onClick}>
          {editSvg}
        </div>
      )}
      {type === "close" && (
        <div className={"category-button " + color} onClick={onClick}>
          {closeSvg}
        </div>
      )}
      {type === "done" && (
        <div className={"category-button " + color} onClick={onClick}>
          {doneSvg}
        </div>
      )}
    </>
  );
};

export default CategoryButton;
