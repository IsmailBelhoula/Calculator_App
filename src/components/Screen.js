import React from "react";
import { CalcContext } from "../context/CalcContext";
import { useContext } from "react";
import { Textfit } from "react-textfit";

const Screen = () => {
  const { calc } = useContext(CalcContext);

  return (
    <Textfit className="screen" max={50} mode="single">
      {calc.num ? calc.num : calc.res}
    </Textfit>
  );
};

export default Screen;
