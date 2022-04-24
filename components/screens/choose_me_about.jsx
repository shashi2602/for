/* eslint-disable react/jsx-no-target-blank */
import md from "markdown-it";
import { useSimplyContext } from "../../context/SimplyContext";

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
        className="w-full h-56 border-2 border-black p-4 rounded dark:bg-gray-700"
        placeholder="Till Your Story..✏️ "
        onChange={(e) => {
          setAbout(e.target.value);
          setChangeDone(true);
        }}
        value={about}
      ></textarea>

      <h4 className="font-semibold">🖨 Preview</h4>
      {about.length ? (
        <div className="bg-gray-100 rounded  mt-2 p-4 ">
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: md().render(about) }}
          />
        </div>
      ) : (
        <h2 className="py-2 font-semibold">start typing...</h2>
      )}
    </div>
  );
}

export default ChooseMeAbout;
