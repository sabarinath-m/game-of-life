import React from "react";
import "./Input.css";
const Input = (props) => {
  return (
    <div className="Input">
      <input
      disabled={props.disable}
        className="inputStyle"
        type="string"
        placeholder='Enter the value'
        value={props.value}
        onChange={props.changed}
      />
    </div>
  );
};

export default Input;
