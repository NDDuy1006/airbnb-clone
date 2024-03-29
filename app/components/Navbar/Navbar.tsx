"use client"

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import MobileSignInButtons from "./MobileSignInButton";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-md">
      <div className="py-4 md:border-b-[1px]">
        <Container>
          <div
            className="flex flex-row items-center justify-between gap-3 md:gap-0"
          >
            <Logo />
            <Search />
            {props.currentUser ? (
              <UserMenu currentUser={props.currentUser} />  
            ): (
              <MobileSignInButtons />
            )}
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar