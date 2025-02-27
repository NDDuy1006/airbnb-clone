"use client";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = (props: ButtonProps) => {
  const {
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
  } = props

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `relative disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:opacity-70 transition w-full`,
        outline ? "bg-white border-black text-black" : "bg-blue-500 border-blue-500 text-white",
        small ? "py-2 font-light border-[1px]" : "py-3 font-semibold border-2"
      )}
    >
      {Icon && (
        <Icon size={24} className="absolute left-4 top-3" />
      )}
      {label}
    </button>
  );
};

export default Button;