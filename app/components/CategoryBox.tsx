"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = (props: CategoryBoxProps) => {
  const {
    icon: Icon,
    label,
    selected
  } = props

  const router = useRouter();
  const params = useSearchParams();

  const clickHandler = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery
    }, { skipNull: true });

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={clickHandler}
      className={twMerge("category-item", selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500")}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox;