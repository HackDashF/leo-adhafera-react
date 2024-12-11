import { BulletListIcon } from "../../icons/bulletList";
import { QuantitiesListIcon } from "../../icons/quantitiesList";
import { ListTypes } from "../../types/List";
import { SVGIcon } from "../../types/SVGIcon";

export interface ListTypeOption {
  type: ListTypes;
  label: string;
  icon: SVGIcon;
}

export const listTypeOptions: ListTypeOption[] = [
  { type: "Basic", label: "Basic", icon: BulletListIcon },
  { type: "Quantities", label: "Quantities", icon: QuantitiesListIcon },
];
