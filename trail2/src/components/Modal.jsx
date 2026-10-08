import React, {
  useEffect,
  useRef,
} from "react";

import "../styles/Modal.css";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) {

  const modalRef = useRef(null);

  // Close on outside click
  const handleOutsideClick = (event) => {

    if (
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {

      onClose();

    }

  };

  // Close on Escape key
  useEffect(() => {

    if (!isOpen) return;

    const handleKeyDown = (event) => {

      if (event.key === "Escape") {

        onClose();

      }

    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [isOpen, onClose]);

  if (!isOpen) {

    return null;

  }

  return (

    <div
      className="modal-overlay"
      onClick={handleOutsideClick}
    >

      <div
        ref={modalRef}
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

        {footer && (

          <div className="modal-footer">

            {footer}

          </div>

        )}

      </div>

    </div>

  );

}

export default Modal;