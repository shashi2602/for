import React from "react";

function Label({ text }) {
  return (
    <label className="text-black dark:text-white font-semibold">{text}</label>
  );
}

export default Label;
