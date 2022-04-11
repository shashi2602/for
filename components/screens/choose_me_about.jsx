/* eslint-disable react-hooks/exhaustive-deps */
import md from "markdown-it";
import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

function ChooseMeAbout() {
  const { currentUser,about,setAbout,setChangeDone} = useSimplyContext();

  useEffect(()=>{
    setAbout(currentUser.about_markdown?currentUser.about_markdown:"")
  },[])

  const handleSave = () => {
    if (about != "") {
      try {
        updateUserDoc(currentUser.docid, { about_markdown: about });
        setChangeDone("change done in about")
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="w-full m-2">
      <textarea
        className="w-full h-56 border-2 border-black p-4 rounded"
        placeholder="Till Your Story..✏️ "
        onChange={(e) => {
          setAbout(e.target.value);
        }}
        value={about}
      ></textarea>
      <h4 className="font-semibold">🖨 Preview</h4>
      {about.length? (
        <div className="bg-gray-100 rounded  mt-2 p-2 ">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: md().render(about) }}
          />
        </div>
      ) : (
        <h2>start typing</h2>
      )}
      <button
        className="bg-yellow-400 text-black px-3 py-2 rounded mt-2"
        onClick={handleSave}
      >
        Update
      </button>
    </div>
  );
}

export default ChooseMeAbout;
