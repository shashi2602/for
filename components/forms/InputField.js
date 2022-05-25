import React from "react";

function InputField({
  name,
  type = "text",
  placeholder,
  value,
  onchange,
  size = "w-full",
}) {
  return (
    <input
      id={name}
      type={type}
      className={` dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 py-2 px-3 mb-2 capitalize ${
        size ? size : ""
      }`}
      placeholder={placeholder}
      value={value}
      name={name}
      required
      onChange={onchange}
    />
  );
}

export default InputField;
