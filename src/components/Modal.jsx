import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "../components/Modal.css"

export default function Modal({children, open, className = ""}) {
  const dialog = useRef();

  useEffect(()=> {
    if (open) {
    dialog.current.showModal();
  }
  }, [open])


  return createPortal(<dialog ref={dialog} className={className}>
    {children}
  </dialog>, document.getElementById("modal"));
}