import { useState } from "react";
import SaveButton from "./buttons/save_btn";
import { chooseMeTypes } from "./utiles/choose_me_types";
function ChooseMe(props) {
  const [type, setType] = useState();

  return (
    <div className="h-auto w-full ">
      <div className="flex flex-wrap gap-2 sm:gap-4 p-5 justify-center">
        {chooseMeTypes.map((type) => {
          return (
            <button
              key={type.type_name}
              className={`px-4 py-1  border-2 border-solid border-black font-semibold rounded hover:bg-black hover:text-yellow-300  transition duration-300 ease-in-out ${
                props.typeSelected === type.type_name
                  ? "bg-yellow-300 border-b-4 shadow-lg shadow-yellow-200"
                  : ""
              }`}
              onClick={() => {
                setType(type.type_name);
                props.handleChange(type.type_name);
              }}
            >
              {type.icon} {type.name}
            </button>
          );
        })}
        {type === "MYWISH" ? <> </> : <SaveButton />}
      </div>
    </div>
  );
}
export default ChooseMe;
