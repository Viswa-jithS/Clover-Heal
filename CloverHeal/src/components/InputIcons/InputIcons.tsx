import React from "react";

interface Props {
  property1:
    | "chevron-down"
    | "arrow-up-right"
    | "user"
    | "menu"
    | "layers"
    | "zap";
  size: "medium" | "big";
  className: any;
  propertyMenuSize: string;
  propertyChevron: string;
  propertyUserSize: string;
  propertyArrowUp: string;
  propertyZapSize: string;
  img?: string;
}

export const InputIcons = ({
  property1,
  size,
  className,
  propertyMenuSize = "/assets/property-1-menu--size-big.svg",
  propertyChevron = "/assets/property-1-chevron-down--size-big.svg",
  propertyUserSize = "/assets/property-1-user--size-medium.svg",
  propertyArrowUp = "/assets/property-1-arrow-up-right--size-big.svg",
  propertyZapSize = "/assets/property-1-zap--size-big.svg",
  img = "/assets/property-1-zap--size-medium.svg",
}: Props): JSX.Element => {
  return (
    <img
      className={`left-0 top-0 absolute ${size === "big" ? "w-6" : "w-[18px]"} ${size === "big" ? "h-6" : "h-[18px]"} ${className}`}
      alt="Property user size"
      src={
        property1 === "user"
          ? propertyUserSize
          : property1 === "zap" && size === "medium"
            ? img
            : property1 === "layers"
              ? "/assets/property-1-layers--size-big.svg"
              : property1 === "arrow-up-right"
                ? propertyArrowUp
                : property1 === "menu"
                  ? propertyMenuSize
                  : property1 === "chevron-down"
                    ? propertyChevron
                    : propertyZapSize
      }
    />
  );
};
