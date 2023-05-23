import { useState } from "react";
import { CategoryNode } from "../../models/category.model";
import "./categories.css";
import Category from "../Category/Category";

const Categories: React.FC<{ categories: CategoryNode[] }> = ({
  categories,
}) => {
  const [_categories, setCategories] = useState(categories);

  const handleAdd = (node: CategoryNode, type: "service" | "category") => {
    const newNode: CategoryNode = {
      name: "",
      type,
      mode: "create",
      children: [],
    };

    node.children.push(newNode);

    setCategories([..._categories]);
  };

  const handleEdit = (node: CategoryNode, parent: CategoryNode | null) => {
    const changeNodeMode = (nodeToChange: CategoryNode) => {
      if (parent === null) {
        return;
      }
      const nodeIndex = parent.children.findIndex(
        (node) => node === nodeToChange
      );
      if (nodeIndex !== -1) {
        parent.children[nodeIndex] = {
          ...parent.children[nodeIndex],
          mode: "edit",
        };
      } else {
        parent.children.forEach((child) => changeNodeMode(child));
      }
    };

    changeNodeMode(node);
    setCategories([..._categories]);
  };

  const handleRemove = (node: CategoryNode, parent: CategoryNode | null) => {
    const removeNode = (nodeToRemove: CategoryNode) => {
      if (parent === null) {
        return;
      }
      const nodeIndex = parent.children.findIndex(
        (node) => node === nodeToRemove
      );
      if (nodeIndex !== -1) {
        parent.children.splice(nodeIndex, 1);
      } else {
        parent.children.forEach((child) => removeNode(child));
      }
    };

    removeNode(node);

    setCategories([..._categories]);
  };

  const handleFinishAdd = (
    node: CategoryNode,
    parent: CategoryNode | null,
    nodeName: string
  ) => {
    const changeNodeMode = (nodeToChange: CategoryNode) => {
      if (parent === null) {
        return;
      }
      const nodeIndex = parent.children.findIndex(
        (node) => node === nodeToChange
      );
      if (nodeIndex !== -1) {
        parent.children[nodeIndex] = {
          ...parent.children[nodeIndex],
          name: nodeName,
          mode: undefined,
        };
      } else {
        parent.children.forEach((child) => changeNodeMode(child));
      }
    };

    changeNodeMode(node);
    setCategories([..._categories]);
  };

  const handleCancelAdd = (node: CategoryNode, parent: CategoryNode | null) => {
    handleRemove(node, parent);
  };

  const handleCancelEdit = (
    node: CategoryNode,
    parent: CategoryNode | null
  ) => {
    const changeNodeMode = (nodeToChange: CategoryNode) => {
      if (parent === null) {
        return;
      }
      const nodeIndex = parent.children.findIndex(
        (node) => node === nodeToChange
      );
      if (nodeIndex !== -1) {
        parent.children[nodeIndex] = {
          ...parent.children[nodeIndex],
          mode: undefined,
        };
      } else {
        parent.children.forEach((child) => changeNodeMode(child));
      }
    };

    changeNodeMode(node);
    setCategories([..._categories]);
  };

  const categoriesRendering = (
    categories: CategoryNode[],
    parent: CategoryNode | null
  ) => {
    return (
      <>
        <ul>
          {categories.map((c, i) => (
            <li key={i}>
              <Category
                category={c}
                onAdd={(type: "service" | "category") => handleAdd(c, type)}
                onRemove={() => handleRemove(c, parent)}
                onEdit={() => handleEdit(c, parent)}
                onFinishAdd={(nodeName) => handleFinishAdd(c, parent, nodeName)}
                onCancelAdd={() => handleCancelAdd(c, parent)}
                onCancelEdit={() => handleCancelEdit(c, parent)}
              ></Category>
              {c.children && c.children.length
                ? categoriesRendering(c.children, c)
                : ""}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <div className="tree">{categoriesRendering(categories, null)}</div>
    </>
  );
};

export default Categories;
