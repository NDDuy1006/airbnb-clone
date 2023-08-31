"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = (props: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, []);

  const onRent = useCallback(() => {
    if (!props.currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [props.currentUser, loginModal, rentModal]);

  

  return (
    <div className="relative md:block">
      <div
        className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="category-button"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="user-context-menu-button"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={ props.currentUser?.image } />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="user-context-menu-overlay" onClick={toggleOpen}>
          <div className="user-context-menu">
            <div className="flex flex-col cursor-pointer">
              {props.currentUser ? (
                <>
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={() => router.push("/favourites")}
                    label="My favourites"
                  />
                  <MenuItem
                    onClick={() => router.push("/reservations")}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={() => router.push("/properties")}
                    label="My properties"
                  />
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label="Airbnb my home"
                  />
                  <hr />
                  <MenuItem
                    onClick={() => {signOut()}}
                    label="Logout"
                  />
                </>
              ): (
                <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Log in"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Sign up"
                />
              </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default UserMenu;