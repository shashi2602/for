import { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { social } from "../utiles/social_types";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc} from "../../services/user.services";

function ChooseMeSocialMedia() {
  let [isOpen, setIsOpen] = useState(false);
  let [clickedSocial, setClickedSocial] = useState({});
  const linkRef = useRef();
  const { selectedSocial, setSelectedSocial, error, currentUser } =
    useSimplyContext();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(clicked) {
    setIsOpen(true);
    setClickedSocial({ ...clicked });
  }
  const handleLinkSubmit = (s) => {
    const final_selected_social = { link: linkRef.current.value, ...s };
    if (selectedSocial.some((item) => item.value === s.value)) {
      console.log("already there plz remove or edit it");
    } else {
      setSelectedSocial((item) => [...item, final_selected_social]);
    }
    closeModal();
  };
  const handleRemoveSocial = (e) => {
    setSelectedSocial(selectedSocial.filter((item) => item.value != e.value));
  };
  const handleSave = () => {
    try {
      updateUserDoc(currentUser.docid, { social: selectedSocial });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    console.log(currentUser.social)
    setSelectedSocial(currentUser.social)
  },[])
  return (
    <>
      {selectedSocial?.length != 0 ? (
        <div className="w-full bg-gray-100 rounded my-4 p-2">
          <div className="flex flex-wrap  gap-3">
            {selectedSocial?.map((s, i) => {
              return (
                <div key={i}>
                  <div className=" p-2 flex gap-2 bg-gray-200 rounded ">
                    <i
                      className={`fa fa-${s.value} text-${s.color}  text-lg`}
                    ></i>
                    <p className=" font-semibold text-lg">{s?.label}</p>
                    <button onClick={() => handleRemoveSocial(s)}>
                      <i className="fa fa-close text-red-500"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className=" w-full  rounded py-2">
        <div className="flex flex-wrap justify-center gap-3">
          {social.map((s, i) => {
            return (
              <div
                key={i}
                className="bg-gray-300 cursor-pointer h-24 w-24 rounded flex justify-center"
                onClick={() => {
                  openModal(s);
                }}
              >
                <div className="py-4 flex items-center ">
                  <div>
                    <i className={`fa fa-${s.value} text- text-3xl`}></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-md"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-black rounded-md">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <i
                      className={`fa fa-${clickedSocial.value} text-${clickedSocial.color}`}
                    ></i>{" "}
                    {clickedSocial.label}
                  </Dialog.Title>
                  <div className="mt-4">
                    <input
                      type="text"
                      name="link"
                      placeholder="https://"
                      className="w-full h-10 p-2 border-1"
                      value={clickedSocial?.link}
                      ref={linkRef}
                    />
                  </div>

                  <div className="mt-4 ">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium  bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 mr-2 text-white"
                      onClick={closeModal}
                    >
                      close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium  bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => handleLinkSubmit(clickedSocial)}
                    >
                      ✔️Add
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      {error.show ? <p>{error.msg}</p> : <></>}
      <button
        className="bg-yellow-400 text-black px-3 py-2 rounded mt-2"
        onClick={handleSave}
      >
        submit
      </button>
    </>
  );
}
export default ChooseMeSocialMedia;
