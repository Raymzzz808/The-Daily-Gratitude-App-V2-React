import React from "react";

function Footer() {
  const time = new Date();
  const date = time.getFullYear();

  return (
    <div className="footer">
      <small> Remain Grateful in ©{date} </small>
    </div>
  );
}

export default Footer;
