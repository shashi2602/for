
import md from "markdown-it";
import { useSimplyContext } from "../../context/SimplyContext";


function ChooseMeAbout() {
  const {about,setAbout,setChangeDone} = useSimplyContext();





  return (
    <div className="w-full m-2">
      <textarea
        className="w-full h-56 border-2 border-black p-4 rounded"
        placeholder="Till Your Story..✏️ "
        onChange={(e) => {
          setAbout(e.target.value);
          setChangeDone(true)
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

    </div>
  );
}

export default ChooseMeAbout;
