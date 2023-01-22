import React from "react";
import "./index.css";

const Bar = ({ item, idnum }) => {
  const mystyle = {
    color: "white",
    backgroundColor: "rgb(7 157 206)",
    // padding: "10px",
    fontFamily: "Arial",
    height: item,
    width: "2px",
  };
  return <div id={`bar-${idnum}`} className="bar" style={mystyle}></div>;
};

export default Bar;
