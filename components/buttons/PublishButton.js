import React from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

export default function PublishButton() {
  const { changeDone, setChangeDone, currentUser, setIsPublished, currentTab } =
    useSimplyContext();

  const handleSubmit = () => {
    try {
      updateUserDoc(currentUser.uid, {
        ...currentUser,
        last_visited_tab: currentTab,
      });
      toast.success("😍 successfully published ");
      setChangeDone(false);
      setIsPublished(true);
    } catch (e) {
      toast.error(" 😭 error occurred");
    }
  };
  return (
    <button
      className=" text-black bg-yellow-300 font-semibold capitalize px-3 py-2 hover:bg-yellow-200 rounded-md disabled:cursor-no-drop"
      onClick={handleSubmit}
      disabled={!changeDone}
    >
      ✈️ Save changes
    </button>
  );
}
