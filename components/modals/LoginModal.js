import React, { Fragment, useState } from "react";
import GoogleBtn from "../buttons/GoogleButton";
import GithubBtn from "../buttons/GithubButton";
import { Dialog, Transition } from "@headlessui/react";
import DarkMode from "../buttons/DarkMode";
function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(!showModal)}
        className="px-4 py-2 text-sm font-semibold text-black bg-yellow-400    p-3 transition border-2 border-black  rounded-md shadow-[3px_3px_0_0_#000] dark:border-[#0B0B0B] dark:shadow-[3px_3px_0_0_#0B0B0B] hover:shadow-none mr-2"
      >
        Login
      </button>
      <DarkMode />
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm "
          onClose={() => setShowModal(!showModal)}
        >
          <div className="min-h-screen px-4 text-center  ">
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
              <div className="inline-block w-full dark:bg-[#121212] bg-gray-100 max-w-md  my-8 overflow-hidden text-left align-middle transition-all transform   shadow-[3px_3px_0_0_#000] dark:shadow-none  border-black border-2  rounded-md  p-4">
                <h1
                  as="h3"
                  className="text-lg font-medium leading-6 text-center dark:text-white"
                >
                  what to see the wonders? 👇
                </h1>

                <div className="mt-3 flex gap-2 w-full justify-center ">
                  <GoogleBtn />
                  <br />
                  <GithubBtn />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default LoginModal;
