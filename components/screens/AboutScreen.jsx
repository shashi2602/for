/* eslint-disable react/jsx-no-target-blank */

import { useSimplyContext } from "../../context/SimplyContext";
import MarkdownPreview from "../MarkdownPreview";

function ChooseMeAbout() {
  const { about, setAbout, setChangeDone } = useSimplyContext();

  return (
    <div className="w-full">
      <a href="https://www.markdownguide.org/basic-syntax" target={"_blank"}>
        <p align="right" className="py-2 text-sm">
          Markdown supported
        </p>
      </a>
      <textarea
        className="w-full h-56 border-2  p-4  dark:bg-[#18181B]  transition dark:border-white dark:shadow-[3px_3px_0_0_#fff] border-black rounded-md shadow-[3px_3px_0_0_#000] "
        placeholder="Till Your Story..✏️ "
        onChange={(e) => {
          setAbout(e.target.value);
          setChangeDone(true);
        }}
        value={about}
      ></textarea>

      <h4 className="font-semibold mt-3">🖨 Preview</h4>
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
