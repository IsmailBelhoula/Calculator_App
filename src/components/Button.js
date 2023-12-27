import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      x: signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };
    if (results[value]) {
      results[value]();
    } else {
      handleClickButton(value);
    }
  };

  const commaClick = () => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      num: !prevCalc.num.toString().includes(".")
        ? prevCalc.num + value
        : prevCalc.num,
    }));
  };

  const resetClick = () => {
    setCalc((prevCalc) => ({ sign: "", num: 0, res: 0 }));
  };

  const handleClickButton = (numberString) => {
    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc((prevCalc) => ({
      ...prevCalc,
      num: numberValue,
    }));
  };

  const signClick = () => {
    setCalc((prevCalc) => ({
      sign: value,
      res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
      num: 0,
    }));
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          x: (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc((prevCalc) => ({
        res: math(prevCalc.res, prevCalc.num, prevCalc.sign),
        sign: "",
        num: 0,
      }));
    }
  };

  const persenClick = () => {
    setCalc((prevCalc) => ({
      num: prevCalc.num / 100,
      res: prevCalc.res / 100,
      sign: "",
    }));
  };

  const invertClick = () => {
    setCalc((prevCalc) => ({
      num: prevCalc.num ? prevCalc.num * -1 : 0,
      res: prevCalc.res ? prevCalc.res * -1 : 0,
      sign: "",
    }));
  };

  const getStyleName = (btn) => {
    const className = {
      "=": "equals",
      x: "opt",
      "-": "opt",
      "+": "opt",
      "/": "opt",
    };
    return className[btn];
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
