import React from "react";
import "./index.css";

const Bar = ({ item, idnum }) => {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    // padding: "10px",
    fontFamily: "Arial",
    height: 3 * item,
    width: "4px",
  };
  return <div id={`bar-${idnum}`} className="bar" style={mystyle}></div>;
};

export default Bar;
