import React from "react";

function TextArea({ onchange, value, placeholder, width, name,height }) {
  return (
    <textarea
      className={` dark:bg-[#18181B] rounded-md border-2 border-black dark:border-none ${height?height:"h-15"} p-2 mb-2 ${
        width ? width : "w-full"
      }`}
      onChange={onchange}
      placeholder={placeholder}
      value={value}
      name={name}
    />
  );
}

export default TextArea;
