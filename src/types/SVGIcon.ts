import { FC, SVGProps } from "react";

export type SVGIconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
};

export type SVGIcon = FC<SVGIconProps>;
