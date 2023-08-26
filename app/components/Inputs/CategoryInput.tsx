"use client"

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = (props: CategoryInputProps) => {
  const {
    icon: Icon,
    label,
    selected,
    onClick,
  } = props;

  return (
    <div
      onClick={() => onClick(label)}
      className={twMerge(`category-card`, selected ? "border-black" : "border-neutral-200")}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
  );
}
 
export default CategoryInput;

// selected ? "border-black" : "border-neutral-200"