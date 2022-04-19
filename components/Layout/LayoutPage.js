/* eslint-disable react-hooks/exhaustive-deps */
import ChooseMe from "../choose_me";
import ChooseMeInBrife from "../choose_me_in_brief";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { updateUserDoc } from "../../services/user.services";
import { useSimplyContext } from "../../context/SimplyContext";
function LayoutPage() {
  const {currentUser,currentTab,setCurrentTab}=useSimplyContext()

  useEffect(()=>{
    setCurrentTab(currentUser?.last_visited_tab?currentUser?.last_visited_tab:"PROFILE")
  },[])

  function handleSelectType(type) {
    setCurrentTab(type);
  }
  return (
    <>
    <NavBar/>
      <div className="h-screen mx-0 sm:mx-20 md:mx-56">
        <ChooseMe handleChange={handleSelectType} typeSelected={currentTab} />
        <ChooseMeInBrife type={currentTab}/>
      </div>
    </>
  );
}

export default LayoutPage;
