import React from "react";
import "./GridCreator.css";
import GridElement from "../GridElement/GridElement";

const GridCreator = (props) => {
  let gridView = props.GridList.map((innerList, key) => {
    return (
      <div className="row" key={key}>
        {innerList.map((innerValue, innerKey) => {
          return (
            <GridElement
              value={innerValue}
              key={String(key) + String(innerKey)}
              index={String(key) + "," + String(innerKey)}
              toogleElement={props.toogleElement}
              x={props.x}
              y={props.y}
            />
          );
        })}
      </div>
    );
  });

  return <div className="grid">{gridView}</div>;
};

export default GridCreator;
