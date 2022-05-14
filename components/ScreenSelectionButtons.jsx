import { useState } from "react";
import PublishButton from "./buttons/PublishButton";
import { chooseMeTypes } from "./utiles/Screens";
function ChooseMe(props) {
  const [type, setType] = useState();

  return (
    <div className="h-auto w-full bg-gray-100 dark:bg-[#18181B]  rounded-lg mt-2 ">
      <div className="flex flex-wrap gap-2 sm:gap-4 p-5 justify-center">
        {chooseMeTypes.map((type) => {
          return (
            <button
              key={type.type_name}
              className={`px-4 py-1 dark:bg-[#18181B] border-2 border-solid border-black  shadow-[3px_3px_0_0_#000] dark:border-white dark:shadow-[3px_3px_0_0_#fff] hover:shadow-none font-semibold rounded-md  transition duration-300 ease-in-out ${
                props.typeSelected === type.type_name
                  ? "bg-yellow-300  border-b-4 shadow-lg dark:bg-yellow-300 dark:text-black  dark:shadow-none dark:hover:shadow-none"
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
        <div className="lg:hidden">
          <PublishButton />
        </div>
      </div>
    </div>
  );
}
export default ChooseMe;
