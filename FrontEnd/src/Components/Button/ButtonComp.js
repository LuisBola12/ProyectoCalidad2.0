import React from "react";
import "./Button.css";

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
  "btn--transparent--solid",
  "btn--register--navbar",
  "btn--logIn--logIn",
  "btn--register",
  "btn--cancel"
];

const SIZES = ["medium--btn", "small--btn", "large--btn", "extra--large--btn"];
const BUTTONSTYPES = ["btn", "btn--t", "btn--i"];

export const ButtonComp = ({
  children,
  buttonType,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonType = BUTTONSTYPES.includes(buttonType) ? buttonType : BUTTONSTYPES[0];
  return (
    <button
      className={`${checkButtonType} ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
