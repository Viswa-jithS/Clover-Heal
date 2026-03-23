import React from "react";
import { InputIcons } from "../InputIcons";

type IconType = "user" | "menu" | "chevron-down" | "arrow-up-right" | "layers" | "zap";

interface Props {
  showIcon?: boolean;
  label?: string;
  state?: "default";
  className?: string;
  inputIconsPropertyZapSize?: string;
  inputIconsProperty1?: IconType; // ✅ change here
}

export const Badge = ({
  showIcon = true,
  label = "Bring multiple screens from Figma",
  state = "default",
  className = "",
  inputIconsPropertyZapSize,
  inputIconsProperty1 = "user", // ✅ matches IconType
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex h-8 items-center justify-center gap-1 px-3 py-1.5 relative bg-color-primary-100 rounded-3xl border border-solid border-color-primary-100 ${className}`}
    >
      {showIcon && (
        <InputIcons
          className="!relative !left-[unset] !top-[unset]"
          img={inputIconsPropertyZapSize}
          property1={inputIconsProperty1} // ✅ valid type
          propertyUserSize="/assets/input-icons-6.svg"
          size="medium" propertyMenuSize={""} propertyChevron={""} propertyArrowUp={""} propertyZapSize={""}        />
      )}

      <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
        <p className="relative w-fit mt-[-1.00px] font-body-XS font-[number:var(--body-XS-font-weight)] text-color-light-1000 text-[length:var(--body-XS-font-size)] tracking-[var(--body-XS-letter-spacing)] leading-[var(--body-XS-line-height)] whitespace-nowrap [font-style:var(--body-XS-font-style)]">
          {label}
        </p>
      </div>
    </div>
  );
};
