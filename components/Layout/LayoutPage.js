/* eslint-disable react-hooks/exhaustive-deps */
import ChooseMe from "../ScreenSelectionButtons";
import ChooseMeInBrief from "../ScreenSelection";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { updateUserDoc } from "../../services/user.services";
import { useSimplyContext } from "../../context/SimplyContext";
function LayoutPage() {
  const { currentUser, currentTab, setCurrentTab } = useSimplyContext();

  useEffect(() => {
    setCurrentTab(
      currentUser?.last_visited_tab ? currentUser?.last_visited_tab : "PROFILE"
    );
  }, []);

  function handleSelectType(type) {
    setCurrentTab(type);
    console.log(type);
  }
  return (
    <>
      <NavBar />
      <div className="h-screen mx-2 sm:mx-20 md:mx-56">
        <ChooseMe handleChange={handleSelectType} typeSelected={currentTab} />
        <ChooseMeInBrief type={currentTab} />
      </div>
    </>
  );
}

export default LayoutPage;
