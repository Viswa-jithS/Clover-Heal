/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { useReducer } from "react";
import { InputIcons } from "../InputIcons";

interface Props {
  stateProp: "closed" | "open";
  className: any;
  text: string;
}

export const Faq = ({
  stateProp,
  className,
  text = "How it works?",
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "closed",
  });

  return (
    <div
      className={`border border-solid border-color-light-250 w-[422px] flex flex-col items-start rounded-3xl bg-color-light-50 relative ${state.state === "closed" ? "gap-4" : "gap-[var(--spacing-spacing-lg)]"} ${state.state === "closed" ? "p-6" : "pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)]"} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="w-full flex self-stretch items-center flex-[0_0_auto] justify-between relative">
        <div className="[font-family:'Open_Sans',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-base text-color-light-1000 font-semibold leading-6 whitespace-nowrap relative">
          {text}
        </div>

        {state.state === "closed" && (
          <InputIcons
            className="!relative !left-[unset] !top-[unset]"
            property1="chevron-down"
            propertyChevron="/assets/input-icons-17.svg"
            size="big" propertyMenuSize={""} propertyUserSize={""} propertyArrowUp={""} propertyZapSize={""}          />
        )}

        {state.state === "open" && (
          <img
            className="relative w-6 h-6"
            alt="Input icons"
            src="/assets/input-icons-4.svg"
          />
        )}
      </div>

      {state.state === "open" && (
        <p className="relative self-stretch [font-family:'Open_Sans',Helvetica] font-normal text-color-light-750 text-base tracking-[0] leading-6">
          “We reduced project delays by 40% since switching to FlowTrack. Our
          remote teams finally feel aligned.”
        </p>
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "click":
      return {
        ...state,
        state: state.state === "open" ? "closed" : "open",
      };
  }

  return state;
}
