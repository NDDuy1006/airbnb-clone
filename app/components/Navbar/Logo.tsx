"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="items-center hidden md:inline-flex cursor-pointer"
    >
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="mr-2"
        height="30"
        width="30"
        src="/images/logoipsum.svg"
      />
      <span
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className="text-2xl text-blue-500 font-extrabold"
      >
        Oasis
      </span>
    </div>
  )
}

export default Logo;