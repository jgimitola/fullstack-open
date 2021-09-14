import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises: {parts.reduce((acc, crr) => acc + crr.exercises, 0)}
    </p>
  );
};

export default Total;
