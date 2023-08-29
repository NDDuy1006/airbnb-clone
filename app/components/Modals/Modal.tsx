"use client"

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryActionLabel?: string;
  onSubmit: () => void;
  onClose: () => void;
  secondaryAction?: () => void;
}

const Modal = (props: ModalProps) => {
  const {
    isOpen,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryActionLabel,
    onSubmit,
    onClose,
    secondaryAction
  } = props

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    } 

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        {/* CONTENT */}
        <div
          className={twMerge(
            `translate duration-300 h-full`,
            showModal ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="modal-container h-[660px] md:h-full">
            {/* HEADER */}
            <div
              className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]"
            >
              <button
                onClick={handleClose}
                className="modal-close-button"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">
                {title}
              </div>
            </div>
            {/* BODY */}
            <div className="relative p-4">
              {body}
            </div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 px-6 py-4">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  /> 
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;