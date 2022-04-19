import React from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

export default function SaveButton() {
  const {
    changeDone,
    selectedSocial,
    projectList,
    about,
    stackList,
    profileData,
    currentUser,
    currentTab,
  } = useSimplyContext();

  const handleSubmit = () => {
    const updateData = {
      ...profileData,
      about_markdown: about,
      projects: projectList,
      skills: stackList,
      social: selectedSocial,
      last_visited_tab: currentTab,
    };
    try {
      updateUserDoc(currentUser.docid,updateData);
      console.log(updateData)
      toast.success("😍 successfully published ")
    } 
    catch (e) {
      toast.error(" 😭 error occured")
    }
  };
  return (
    <button
      className="text-white bg-black font-semibold px-3 py-2 rounded disabled:bg-gray-200 "
      onClick={handleSubmit}
      disabled={!changeDone}
    >
      ✈️ Publish
    </button>
  );
}
