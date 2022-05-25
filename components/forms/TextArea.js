import React from "react";

function TextArea({ onchange, value, placeholder, width }) {
  return (
    <textarea
      className={` dark:bg-[#18181B] rounded-md border-2 border-black dark:border-2 dark:border-black/20 h-15 p-2  ${
        width ? width : "w-full"
      }`}
      onChange={onchange}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default TextArea;
