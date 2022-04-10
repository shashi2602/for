import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GoogleBtn from "../buttons/google_btn";
import GithubBtn from "../buttons/github_btn";
function LoginModel() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="px-4 py-2 text-sm font-semibold text-black bg-yellow-400  rounded-md "
      >
        Login
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center dark:bg-gray-900 ">
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
              <div className="inline-block w-full dark:bg-gray-800 bg-gray-100 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 dark:text-white"
                >
                  Welcome back.
                </Dialog.Title>
                <div className="mt-2">
                  <GoogleBtn/>
                  <br/>
                  <GithubBtn/>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black border-black bg-yellow-400 border  rounded-md hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
export default LoginModel;