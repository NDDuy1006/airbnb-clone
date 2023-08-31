"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string
}

const MenuItem = (props: MenuItemProps) => {
  const {
    onClick,
    label
  } = props;

  return (
    <div
      onClick={onClick}
      className="px-5 py-3 hover:bg-neutral-100 transition font-semibold text-center md:text-start text-lg md:text-sm"
    >
      {label}
    </div>
  )
};

export default MenuItem