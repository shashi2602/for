/* eslint-disable react/jsx-no-target-blank */

import { useSimplyContext } from "../../context/SimplyContext";
import MarkdownPreview from "../MarkdownPreview";

function ChooseMeAbout() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 mt-4 mb-10">
      <div>
        <a href="https://www.markdownguide.org/basic-syntax" target={"_blank"}>
          <p className="py-2 text-sm">Markdown supported</p>
        </a>
        <textarea
          className="w-full h-[15rem] sm:h-full md:h-full focus:outline-none bg-gray-100 p-4  dark:bg-[#18181B]   rounded-md  "
          placeholder="Till Your Story..✏️ "
          onChange={(e) => {
            setCurrentUser((prev) => ({
              ...prev,
              about_markdown: e.target.value,
            }));
            setChangeDone(true);
          }}
          value={currentUser.about_markdown}
        ></textarea>
      </div>
      <div className="">
        <h4 className="font-semibold mt-3">🖨 Preview</h4>
        {currentUser.about_markdown.length ? (
          <div className="prose text-justify max-w-none px-4 prose-strong:underline  prose-a:decoration-yellow-400 prose-a:decoration-wavy prose-a:decoration-2 dark:prose-invert rounded">
            <MarkdownPreview about={currentUser.about_markdown} />
          </div>
        ) : (
          <h2 className="py-2 font-semibold">start typing...</h2>
        )}
      </div>
    </div>
  );
}

export default ChooseMeAbout;
