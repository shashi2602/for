/* eslint-disable react/jsx-no-target-blank */

import { useSimplyContext } from "../../context/SimplyContext";
import { MarkdownPreview } from "../markdownPreview";

function ChooseMeAbout() {
  const { about, setAbout, setChangeDone } = useSimplyContext();

  return (
    <div className="w-full m-2">
      <a href="https://www.markdownguide.org/basic-syntax" target={"_blank"}>
        <p align="right" className="py-2 text-sm">
          Markdown supported
        </p>
      </a>
      <textarea
        className="w-full h-56 border-2 border-black dark:border-[#18181B] p-4 rounded dark:bg-[#18181B]"
        placeholder="Till Your Story..✏️ "
        onChange={(e) => {
          setAbout(e.target.value);
          setChangeDone(true);
        }}
        value={about}
      ></textarea>

      <h4 className="font-semibold mt-2">🖨 Preview</h4>
      {about.length ? (
        <div className="prose text-justify max-w-none mt-2 p-4 prose-strong:underline dark:prose-invert rounded">
          <MarkdownPreview about={about} />
        </div>
      ) : (
        <h2 className="py-2 font-semibold">start typing...</h2>
      )}
    </div>
  );
}

export default ChooseMeAbout;
