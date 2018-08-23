import React from "react";
import MGrow from "@material-ui/core/Grow";

const Grow = ({ show, style, component: Component }) => {
  return (
    <MGrow in={show}>
      <div style={show ? style : { display: "none" }}>
        <Component />
      </div>
    </MGrow>
  );
};

export default Grow;
