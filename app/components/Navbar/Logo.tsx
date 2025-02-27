"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="inline-flex font-extrabold text-2xl text-blue-500 items-center"
    >
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="hidden md:block cursor-pointer mr-2"
        height="30"
        width="30"
        src="/images/logoipsum.svg"
      />
      Oasis
    </div>
  )
}

export default Logo;