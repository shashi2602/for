import React from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

export default function PublishButton() {
  const {
    changeDone,
    setChangeDone,
    selectedSocial,
    projectList,
    about,
    stackList,
    profileData,
    currentUser,
    currentTab,
    setIsPublished,
    blogSites,
    certifications,
  } = useSimplyContext();

  const handleSubmit = () => {
    const updateData = {
      ...profileData,
      about_markdown: about,
      projects: projectList,
      skills: stackList,
      social: selectedSocial,
      last_visited_tab: currentTab,
      blog_site: blogSites,
      certifications: certifications,
    };
    try {
      updateUserDoc(currentUser.docid, updateData);
      console.log(updateData);
      toast.success("😍 successfully published ");
      setChangeDone(false);
      setIsPublished(true);
    } catch (e) {
      toast.error(" 😭 error occurred");
    }
  };
  return (
    <button
      className=" text-black bg-yellow-300 font-semibold capitalize px-3 py-2 hover:bg-yellow-200 rounded-md disabled:cursor-no-drop   transition"
      onClick={handleSubmit}
      disabled={!changeDone}
    >
      ✈️ Save changes
    </button>
  );
}
