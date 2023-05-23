import { useState } from "react";
import { CategoryNode } from "../../models/category.model";
import "./category.css";
import CategoryButton from "../CategoryButton/CategoryButton";

const Category: React.FC<{
  category: CategoryNode;
  onAdd: (type: "category" | "service") => void;
  onRemove: () => void;
  onEdit: () => void;
  onFinishAdd?: (nodeName: string) => void;
  onCancelAdd?: () => void;
  onCancelEdit?: () => void;
}> = ({
  category,
  onAdd,
  onRemove,
  onEdit,
  onFinishAdd,
  onCancelAdd,
  onCancelEdit,
}) => {
  const [nodeName, setNodeName] = useState(category.name);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handlePopupMenuAction = (type: "category" | "service") => {
    toggleMenu();
    onAdd(type);
  };

  return (
    <>
      <div className="category">
        {(category.mode === "edit" || category.mode === "create") && (
          <>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
            />
            <div className="button-container">
              <CategoryButton
                type="close"
                color="warn"
                onClick={() => {
                  if (category.mode === "create") {
                    onCancelAdd?.();
                  } else if (category.mode === "edit") {
                    onCancelEdit?.();
                  }
                  setNodeName(category.name);
                }}
              ></CategoryButton>
              <CategoryButton
                type="done"
                color="success"
                onClick={() => onFinishAdd?.(nodeName)}
              ></CategoryButton>
            </div>
          </>
        )}
        {category.mode === undefined && (
          <>
            <h4>{category.name}</h4>
            <div className="button-container">
              <CategoryButton
                type="plus"
                onClick={() => {
                  if (category.children.length) {
                    const [firstChild] = category.children;
                    onAdd(firstChild.type);
                  } else {
                    toggleMenu();
                  }
                }}
              ></CategoryButton>
              {!category.root && (
                <CategoryButton
                  type="edit"
                  onClick={() => onEdit()}
                ></CategoryButton>
              )}
              {!category.root && (
                <CategoryButton
                  type="close"
                  color="error"
                  onClick={() => onRemove()}
                ></CategoryButton>
              )}
            </div>
          </>
        )}
        {isOpenMenu && (
          <div className="popup-menu">
            <div className="popup-content">
              <h2 className="title">What do you want to create?</h2>
              <div className="actions">
                <button
                  className="popup-btn"
                  onClick={() => handlePopupMenuAction("service")}
                >
                  Service
                </button>
                <button
                  className="popup-btn"
                  onClick={() => handlePopupMenuAction("category")}
                >
                  Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
