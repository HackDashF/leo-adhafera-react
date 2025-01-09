import { Link } from "react-router-dom";
import { BulletListIcon } from "../icons/bulletList";
import { ProfileIcon } from "../icons/profileIcon";
import { QuantitiesListIcon } from "../icons/quantitiesList";
import { List, ListTypes } from "../types/List";
import { Button } from "./Button";

interface ListCardProps {
  list: List;
  onUnsubscribe: (id: number) => void;
}

export const ListCard = ({ list, onUnsubscribe, ...props }: ListCardProps) => {
  const isLastUser = list.listUsers.length === 1;
  const TypeIcon =
    list.type === "Quantities" ? QuantitiesListIcon : BulletListIcon;

  return (
    <div
      {...props}
      className="border rounded p-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <Link to={`/lists/${list.id}`}>
          <h3 className="font-medium">{list.title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span>{list.items.length}</span>
          <TypeIcon size={20} />
        </div>
        <div className="flex items-center gap-2">
          <span>{list.listUsers.length}</span>
          <ProfileIcon size={20} />
        </div>
      </div>
      <Button
        text={isLastUser ? "Delete" : "Unsubscribe"}
        onClick={() => onUnsubscribe(list.id)}
      />
    </div>
  );
};
