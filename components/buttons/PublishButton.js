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
    <span className="relative inline-flex">
      <button
        className=" text-black bg-yellow-300 font-semibold capitalize px-3 py-2 hover:bg-yellow-200 disabled:bg-yellow-200 rounded-md disabled:cursor-no-drop"
        onClick={handleSubmit}
        disabled={!changeDone}
      >
        ✈️ Save changes
      </button>
      {changeDone && (
        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </span>
  );
}
