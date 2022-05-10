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
    };
    try {
      updateUserDoc(currentUser.docid, updateData);
      console.log(updateData);
      toast.success("😍 successfully published ");
      setChangeDone(false);
      setIsPublished(true);
    } catch (e) {
      toast.error(" 😭 error occured");
    }
  };
  return (
    <button
      className="text-white bg-black font-semibold px-3 py-2  rounded-md disabled:bg-red-400  border-2 border-black disabled:text-black shadow-[3px_3px_0_0_#000] hover:shadow-none transition"
      onClick={handleSubmit}
      disabled={!changeDone}
    >
      ✈️ Publish
    </button>
  );
}
