import React, { useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeToggle from "react-dark-mode-toggle";
function DarkMode() {
  const [colorTheme, setTheme] = useDarkMode();
  const [state, setstate] = useState(false);
  const handleChange = () => {
    if (colorTheme === "light") {
      setTheme("light");
      setstate(false);
    } else {
      setTheme("dark");
      setstate(true);
    }
  };
  return (
    <div className="flex justify-end p-3">
      <DarkModeToggle onChange={handleChange} checked={state} size={50} />
    </div>
  );
}

export default DarkMode;
