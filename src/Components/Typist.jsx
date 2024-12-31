import React, { useRef, useEffect } from "react";
import Typed from "typed.js";

function Typist({
  strings,
  typeSpeed = 200,
  showCursor = false,
  loop = false,
}) {
  const typedText = useRef(null);

  useEffect(() => {
    // Initialize Typed.js on the referenced element
    const typed = new Typed(
      typedText.current,
      {
        strings,
        typeSpeed,
        // backSpeed: 890,
        showCursor,
        // loop: true,
      }[(strings, typeSpeed, showCursor, loop)]
    );

    // Cleanup function to destroy Typed.js instance when component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="heading">
        <h1>
          {" "}
          <span ref={typedText}></span>{" "}
        </h1>
      </div>
    </>
  );
}

export default Typist;
