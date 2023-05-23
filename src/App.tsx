import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import DraggableContainer from "./components/DraggableContainer/DraggableContainer";
import Categories from "./components/Categories/Categories";
import { CategoryNode } from "./models/category.model";

const categories: CategoryNode[] = [
  {
    name: "Categories",
    type: "category",
    root: true,
    children: [
      {
        name: "Category 2",
        type: "service",
        children: [
          {
            name: "Category 3",
            type: "category",
            children: [
              {
                name: "Category 4",
                type: "category",
                children: [],
              },
            ],
          },
          {
            name: "Category 3",
            type: "category",
            children: [
              {
                name: "Category 4",
                type: "category",
                children: [],
              },
            ],
          },
          {
            name: "Category 4",
            type: "category",
            children: [
              {
                name: "Category 5",
                type: "category",
                children: [
                  {
                    name: "Category 6",
                    type: "service",
                    children: [
                      {
                        name: "Category 7",
                        type: "category",
                        children: [],
                      },
                      {
                        name: "Category 8",
                        type: "category",
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    // if zoom more than 200%
    if (zoom > 2) {
      return;
    }
    setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    // if zoom more than 10%
    if (zoom < 0.2) {
      return;
    }
    setZoom(zoom - 0.1);
  };

  const handleCustomZoom = (_zoom: number) => {
    setZoom(_zoom / 100);
  };

  console.log("zoom", zoom);
  const [boxPosition, setBoxPosition] = useState({ x: 350, y: 100 });

  const handleButtonCenter = () => {
    setBoxPosition({ x: 350, y: 150 });
  };

  return (
    <div className="app">
      <Header
        title="Services"
        zoomIn={handleZoomIn}
        currentZoom={zoom}
        zoomOut={handleZoomOut}
        customZoom={handleCustomZoom}
        handleButtonCenter={handleButtonCenter}
      />
      <DraggableContainer
        boxPosition={boxPosition}
        setBoxPosition={setBoxPosition}
        zoom={zoom}
      >
        <Categories categories={categories}></Categories>
      </DraggableContainer>
    </div>
  );
};

export default App;
