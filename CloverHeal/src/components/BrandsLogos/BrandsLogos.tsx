import React from "react";

interface Props {
  brand: "bolt" | "open-AI" | "anthropic" | "anima-logo" | "replit";
  className: any;
  vector: string;
}

export const BrandsLogos = ({
  brand,
  className,
  vector = "/assets/vector-4.svg",
}: Props): JSX.Element => {
  return (
    <div
      className={`relative ${brand === "replit" ? "w-[101px]" : (brand === "open-AI") ? "w-[98px]" : brand === "anthropic" ? "w-[141px]" : brand === "anima-logo" ? "w-[82px]" : "w-14"} ${["anthropic", "bolt", "open-AI", "replit"].includes(brand) ? "bg-[100%_100%]" : ""} ${brand === "anthropic" ? "h-4" : "h-6"} ${brand === "bolt" ? "bg-[url(/assets/vector.svg)]" : (brand === "replit") ? "bg-[url(/assets/vector-1.svg)]" : brand === "open-AI" ? "bg-[url(/assets/vector-2.svg)]" : brand === "anthropic" ? "bg-[url(/assets/vector-3.svg)]" : ""} ${className}`}
    >
      {brand === "anima-logo" && (
        <img
          className="absolute w-[81px] h-6 top-0 left-0"
          alt="Vector"
          src={vector}
        />
      )}
    </div>
  );
};
