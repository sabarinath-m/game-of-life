import React from "react";
import "./GridElement.css";

const GridElement = props => {
  let styleClass = "";
  if (props.value === false) {
    styleClass = "square";
  } else {
    styleClass = "square-active";
  }
  return (
    <div class={styleClass} onClick={() => props.toogleElement(props.index)} />
  );
};

export default GridElement;
