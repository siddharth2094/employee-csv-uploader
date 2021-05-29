import React from "react";

const CardContainer = (props) => {
  return (
    <div className="employee_list">
      <div>{props.children}</div>
    </div>
  );
};

export default CardContainer;
