import React, {
  useEffect,
  useRef,
} from "react";

import "../styles/Modal.css";

function Modal({
  isOpen,
  onClose,
  title = "Modal",
  children,
  footer = null,
}) {

  const modalRef =
    useRef(null);

  /* ==========================
        ESCAPE KEY
  ========================== */

  useEffect(() => {

    if (!isOpen) return;

    const handleKeyDown =
      (event) => {

        if (
          event.key === "Escape"
        ) {

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

  }, [
    isOpen,
    onClose,
  ]);

  /* ==========================
        BODY SCROLL
  ========================== */

  useEffect(() => {

    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {

      document.body.style.overflow =
        previousOverflow;

    };

  }, [isOpen]);

  /* ==========================
        OUTSIDE CLICK
  ========================== */

  const handleOverlayClick =
    (event) => {

      if (
        modalRef.current &&
        !modalRef.current.contains(
          event.target
        )
      ) {

        onClose();

      }

    };

  if (!isOpen) {

    return null;

  }

  return (

    <div
      className="modal-overlay"
      onMouseDown={
        handleOverlayClick
      }
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >

      <div
        ref={modalRef}
        className="modal-container"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="modal-header">

          <h2 id="modal-title">
            {title}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>

        </div>

        {/* BODY */}

        <div className="modal-body">

          {children}

        </div>

        {/* FOOTER */}

        {footer && (

          <div className="modal-footer">

            {footer}

          </div>

        )}

      </div>

    </div>

  );

}

export default React.memo(Modal);