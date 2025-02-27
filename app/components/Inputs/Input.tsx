"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors
}

const Input = (props: InputProps) => {
  const {
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors
  } = props

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={twMerge(
          "peer w-full p-4 pl-9 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          errors[id] ? "border-blue-500 focus:border-blue-500" : "border-neutral-300 focus:border-black",
          formatPrice ? "pl-9" : "pl-4"
        )}
      />
      <label
        className={twMerge(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          formatPrice ? "left-9" : "left-4",
          errors[id] ? "text-blue-500" :  "text-zinc-400"
        )}
      >
        {label}
      </label>
    </div>
  )
}

export default Input;