/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";
import { InputIcons } from "../InputIcons";

interface Props {
  showIcon: boolean;
  label: string;
  type: "primary" | "secondary";
  stateProp: "hover" | "default";
  size: "big";
  className: any;
}

export const Button = ({
  showIcon = true,
  label = "Button",
  type,
  stateProp,
  size,
  className,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "secondary",

    state: stateProp || "default",

    size: size || "big",
  });

  const isPrimary = state.type === "primary";
  const isHover = state.state === "hover";

  const containerStyle: React.CSSProperties = isPrimary
    ? {
        backgroundColor: isHover ? "#e8731a" : "#ff8747",
        border: "none",
        cursor: "pointer",
      }
    : {
        backgroundColor: isHover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.25)",
        cursor: "pointer",
      };

  const textStyle: React.CSSProperties = isPrimary
    ? { color: "#ffffff", fontWeight: 700 }
    : { color: "rgba(255,255,255,0.85)" };

  return (
    <div
      className={`inline-flex items-center px-6 py-2.5 relative justify-center rounded-lg gap-1.5 h-11 transition-all duration-200 ${className}`}
      style={containerStyle}
      onMouseEnter={() => { dispatch("mouse_enter"); }}
      onMouseLeave={() => { dispatch("mouse_leave"); }}
    >
      {showIcon && (
        <InputIcons
          className="!relative !left-[unset] !top-[unset]"
          property1="arrow-up-right"
          propertyArrowUp={
            state.state === "default" && state.type === "secondary"
              ? "/assets/input-icons.svg"
              : "/assets/input-icons-3.svg"
          }
          size="big" propertyMenuSize={""} propertyChevron={""} propertyUserSize={""} propertyZapSize={""}        />
      )}

      <div
        className="font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative"
        style={textStyle}
      >
        {label}
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
