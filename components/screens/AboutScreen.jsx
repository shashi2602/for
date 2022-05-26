/* eslint-disable react/jsx-no-target-blank */

import { useSimplyContext } from "../../context/SimplyContext";
import MarkdownPreview from "../MarkdownPreview";

function ChooseMeAbout() {
  const { about, setAbout, setChangeDone } = useSimplyContext();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 mt-4">
      <div>
        <a href="https://www.markdownguide.org/basic-syntax" target={"_blank"}>
          <p className="py-2 text-sm">Markdown supported</p>
        </a>
        <textarea
          className="w-full h-[20rem] sm:h-full md:h-full focus:outline-none bg-gray-200 p-4  dark:bg-[#18181B]  transition  rounded-md  "
          placeholder="Till Your Story..✏️ "
          onChange={(e) => {
            setAbout(e.target.value);
            setChangeDone(true);
          }}
          value={about}
        ></textarea>
      </div>
      <div className="">
        <h4 className="font-semibold mt-3">🖨 Preview</h4>
        {about.length ? (
          <div className="prose text-justify max-w-none px-4 prose-strong:underline dark:prose-invert rounded">
            <MarkdownPreview about={about} />
          </div>
        ) : (
          <h2 className="py-2 font-semibold">start typing...</h2>
        )}
      </div>
    </div>
  );
}

export default ChooseMeAbout;
