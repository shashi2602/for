/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { social } from "../utiles/SocialTypes";
import { useSimplyContext } from "../../context/SimplyContext";
import Link from "next/link";
import Image from "next/image";
import { firstLetterUpper } from "../utiles/textutils";

function ChooseMeSocialMedia() {
  let [isOpen, setIsOpen] = useState(false);
  let [clickedSocial, setClickedSocial] = useState({});
  const [inputError, setInputError] = useState(false);
  const { selectedSocial, setSelectedSocial, setChangeDone } =
    useSimplyContext();

  function closeModel() {
    setIsOpen(false);
    setInputError(false);
  }

  function openModal(clicked) {
    setIsOpen(true);
    setClickedSocial({ ...clicked });
    if (selectedSocial.some((socials) => socials.value === clicked.value)) {
      setClickedSocial({
        ...selectedSocial.filter(
          (socials) => socials.value === clicked.value
        )[0],
      });
    }
  }

  const handleLinkSubmit = (s) => {
    const final_selected_social = { ...s, id: selectedSocial?.length + 1 };
    if (s.link == "") {
      setInputError(true);
    } else {
      if (selectedSocial.some((item) => item.value === s.value)) {
        setSelectedSocial(
          selectedSocial.map((item) => {
            if (item.value == s.value) {
              return { ...item, link: s.link };
            } else {
              return item;
            }
          })
        );
        setChangeDone(true);
      } else {
        setSelectedSocial((item) => [...item, final_selected_social]);
        setChangeDone(true);
      }
      closeModel();
    }
  };

  const handleRemoveSocial = (e) => {
    setSelectedSocial(selectedSocial.filter((item) => item.value != e.value));
    setChangeDone(true);
  };

  return (
    <>
      {selectedSocial?.length != 0 ? (
        <div className="w-full  dark:bg-[#18181B] rounded my-4 p-2">
          {/* <p className="font-semibold text-lg text-center px-1 mb-4">
            
          </p> */}
          <div className="flex flex-wrap   gap-3">
            {selectedSocial?.map((s, i) => {
              return (
                <div key={i}>
                  <div className=" p-2 flex gap-2 bg-gray-100  border-2  transition   shadow-[3px_3px_0_0_#000] border-black dark:bg-[#18181B] rounded-md ">
                    <Image alt={s.value} src={s.icon} height={20} width={20} />
                    <Link
                      href={`${
                        s.link_placeholder
                          ? s.link_placeholder + s.link
                          : s.link
                      }`}
                      passHref={true}
                    >
                      <a target="_blank" className=" font-semibold text-lg">
                        {firstLetterUpper(s?.value)}
                      </a>
                    </Link>

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
        <p className="text-center py-4 font-semibold">
          Click below social icon to add social account
        </p>
      )}
      <div className=" w-full  rounded py-2">
        <div className="flex flex-wrap justify-center gap-3">
          {social.map((s, i) => {
            return (
              <div
                key={i}
                className="bg-gray-300 dark:bg-[#252528] border-2 border-black dark:hover:bg-yellow-300 cursor-pointer hover:bg-yellow-300 h-24 w-24 rounded-md flex justify-center  transition duration-300 ease-in-out  shadow-[3px_3px_0_0_#000]  hover:shadow-none"
                onClick={() => {
                  openModal(s);
                }}
              >
                <div className="py-4 flex items-center ">
                  <div>
                    <Image alt={s.value} src={s.icon} height={40} width={40} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Model
          isOpen={isOpen}
          closeModel={closeModel}
          clickedSocial={clickedSocial}
          setClickedSocial={setClickedSocial}
          handleLinkSubmit={handleLinkSubmit}
          error={inputError}
        />
      </div>
    </>
  );
}
export default ChooseMeSocialMedia;

export function Model({
  isOpen,
  closeModel,
  clickedSocial,
  setClickedSocial,
  handleLinkSubmit,
  error,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClickedSocial((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-md"
        onClose={closeModel}
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
            <Dialog.Overlay className="fixed inset-0 " />
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
            <div className="inline-block w-full dark:bg-[#18181B] max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2   dark:border-white dark:shadow-[3px_3px_0_0_#fff]  shadow-[3px_3px_0_0_#000] border-black  rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg flex font-medium leading-6 text-gray-900 dark:text-white"
              >
                <Image
                  alt={clickedSocial.value}
                  src={clickedSocial.icon}
                  height={15}
                  width={15}
                />

                <p className="px-2">{clickedSocial.value}</p>
              </Dialog.Title>
              <div className="mt-4">
                <input
                  type="text"
                  name="link"
                  placeholder={clickedSocial.placeholder}
                  className={`w-full h-10 p-2 border-2 border-black  dark:border-[#18181B] ${
                    error && "border-red-600"
                  } rounded`}
                  value={clickedSocial?.link}
                  onChange={handleChange}
                />
                {error && (
                  <p className="text-red-600 font-semibold">required field</p>
                )}
              </div>

              <div className="mt-4 ">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium  bg-red-500   border-2  transition  border-black rounded-md shadow-[3px_3px_0_0_#000] hover:shadow-none hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 mr-2 text-white"
                  onClick={closeModel}
                >
                  close
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium dark:text-black bg-yellow-400 border-2  transition  border-black rounded-md shadow-[3px_3px_0_0_#000] hover:shadow-none hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    handleLinkSubmit(clickedSocial);
                  }}
                >
                  ✔️Add
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}