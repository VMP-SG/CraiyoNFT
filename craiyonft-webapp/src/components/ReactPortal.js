import { createPortal } from "react-dom";
import { useState, useLayoutEffect } from "react";

const ReactPortal = ({ children, wrapperId }) => {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    const createWrapperAndAppendToBody = (wrapperId) => {
      const wrapperElement = document.createElement("div");
      wrapperElement.setAttribute("id", wrapperId);
      document.body.appendChild(wrapperElement);
      return wrapperElement;
    }
  
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  },[wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
