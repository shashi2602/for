/* eslint-disable react-hooks/exhaustive-deps */
import ChooseMe from "../ScreenSelectionButtons";
import ChooseMeInBrief from "../ScreenSelection";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { updateUserDoc } from "../../services/user.services";
import { useSimplyContext } from "../../context/SimplyContext";
import Link from "next/link";
function LayoutPage() {
  const { currentUser, currentTab, setCurrentTab } = useSimplyContext();

  useEffect(() => {
    setCurrentTab(
      currentUser?.last_visited_tab ? currentUser?.last_visited_tab : "PROFILE"
    );
  }, []);

  function handleSelectType(type) {
    setCurrentTab(type);
  }
  return (
    <>
      <NavBar />
      <div className=" mx-2 sm:mx-20 md:mx-56">
        <ChooseMe handleChange={handleSelectType} typeSelected={currentTab} />
        <ChooseMeInBrief type={currentTab} />
      </div>
      <div className="m-2 grid justify-center font-bold">
          <Link href={""}>❤️Simplyfolio</Link>
      </div>
    </>
  );
}

export default LayoutPage;
