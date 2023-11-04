"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  isListingItemTitle?: boolean;
  isListingItemInfo?: boolean
}

const Heading = (props: HeadingProps) => {
  const {
    title,
    subtitle,
    center,
    isListingItemTitle,
    isListingItemInfo
  } = props

  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className={`text-2xl truncate font-bold ${isListingItemTitle && "text-white"} ${isListingItemInfo ? "text-xl" : "text-2xl"}`}>
        {title}
      </div>
      <div className={`font-light mt-2 ${isListingItemTitle ? "text-white" : "text-neutral-500"}`}>
        {subtitle}
      </div>
    </div>
  )
}

export default Heading;