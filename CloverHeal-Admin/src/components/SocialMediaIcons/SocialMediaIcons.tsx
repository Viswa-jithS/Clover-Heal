/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  brand: "github" | "x-twitter" | "linked-in" | "instagram";
  color: "monochrome";
  size: "medium";
  className: any;
}

export const SocialMediaIcons = ({
  brand,
  color,
  size,
  className,
}: Props): JSX.Element => {
  return (
    <img
      className={`w-[18px] left-0 top-0 h-[18px] absolute ${className}`}
      alt="Brand linkedin color"
      src={
        brand === "x-twitter"
          ? "/assets/brand-x--twitter---color-monochrome--size-medium.svg"
          : brand === "instagram"
            ? "/assets/brand-instagram--color-monochrome--size-medium.svg"
            : brand === "github"
              ? "/assets/brand-github--color-monochrome--size-medium.svg"
              : "/assets/brand-linkedin--color-monochrome--size-medium.svg"
      }
    />
  );
};
