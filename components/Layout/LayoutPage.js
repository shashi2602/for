import ChooseMe from "../choose_me";
import ChooseMeInBrife from "../choose_me_in_brief";
import { useState } from "react";
import NavBar from "../NavBar";
import { updateUserDoc } from "../../services/user.services";
import { useSimplyContext } from "../../context/SimplyContext";
function LayoutPage() {
  const {currentUser,setChangeDone}=useSimplyContext()
  const [selectedType, setType] = useState(currentUser?.last_visited_tab?currentUser?.last_visited_tab:"PROFILE"); //TODO:change to PROFILE
  function handleSelectType(type) {
    setType(type);
    // updateUserDoc(currentUser.docid,{'last_visited_tab':type})
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
