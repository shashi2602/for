import ChooseMe from "../choose_me";
import ChooseMeInBrife from "../choose_me_in_brief";
import { useState } from "react";
import NavBar from "../NavBar";
function LayoutPage() {
  const [selectedType, setType] = useState("PROFILE"); //TODO:change to PROFILE

  function handleSelectType(type) {
    setType(type);
  }
  return (
    <>
    <NavBar/>
      <div className="h-screen mx-0 sm:mx-20 md:mx-56">
        {/* <h1 className="text-center text-4xl font-bold my-4">
          <span className="">..-. --- .-.</span>.Dev
        </h1> */}
        <ChooseMe handleChange={handleSelectType} typeSelected={selectedType} />
        <ChooseMeInBrife type={selectedType} />
      </div>
    </>
  );
}

export default LayoutPage;
