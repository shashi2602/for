import React, { useState } from "react";

import DarkModeToggle from "react-dark-mode-toggle";
import { useTheme } from "next-themes";

function DarkMode() {
  const { theme, setTheme } = useTheme();
  const [state, setState] = useState(false);
  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setState(!state);
  };
  return (
    <div className="flex justify-end p-3">
      <DarkModeToggle onChange={handleChange} checked={state} size={50} />
    </div>
  );
}
export default DarkMode;
