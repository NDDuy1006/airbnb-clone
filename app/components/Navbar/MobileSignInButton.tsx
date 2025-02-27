"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface IProps { };

const MobileSignInButtons = (props: IProps) => {
  const logInModal = useLoginModal();
  const registerModal = useRegisterModal()

  return (
    <div className="flex gap-1 md:gap-3">
      <div
        className="mobile-signin-button bg-blue-500 text-white"
        onClick={logInModal.onOpen}
      >
        Log in
      </div>
      <div
        className="mobile-signin-button bg-white border-blue-500 text-neutral-500"
        onClick={registerModal.onOpen}
      >
        Sign up
      </div>

    </div>
  )
}

export default MobileSignInButtons;