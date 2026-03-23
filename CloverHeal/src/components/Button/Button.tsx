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

  return (
    <div
      className={`inline-flex items-center px-6 py-2.5 relative justify-center rounded-lg gap-1.5 h-11 ${
        state.type === "secondary"
          ? state.state === "hover"
            ? "border-color-dark-500 bg-slate-100"
            : "border-color-dark-250 bg-color-light-50"
          : ""
      } ${
        state.type === "primary"
          ? state.state === "hover"
            ? "bg-orange-600"
            : "bg-orange-500"
          : ""
      } ${state.type === "primary" ? "border-[none]" : "border border-solid"} ${className}`}
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
        className={`font-body-SM w-fit mt-[-1.00px] tracking-[var(--body-SM-letter-spacing)] text-[length:var(--body-SM-font-size)] [font-style:var(--body-SM-font-style)] font-[number:var(--body-SM-font-weight)] leading-[var(--body-SM-line-height)] whitespace-nowrap relative ${
          state.type === "primary"
            ? "text-white font-semibold"
            : "text-color-dark-750"
        }`}
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
