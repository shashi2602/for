/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
export default function Modal({ children, show, showAdd, handleAdd }) {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => setIsOpen(false), []);
  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [show]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm "
          onClose={closeModal}
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
              <div className="inline-block w-full dark:bg-[#121212] bg-gray-100 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform   shadow-[3px_3px_0_0_#000] dark:shadow-none  border-black border-2  rounded-md ">
                {children}

                {showAdd && (
                  <div className=" mt-4">
                    <button
                      type="button"
                      className=" py-2 px-4 text-sm font-medium bg-red-500  transition  border-shadow hover:bg-red-600 focus:outline-none  mr-2 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                      }}
                    >
                      close
                    </button>
                    <button
                      type="button"
                      className=" px-4 py-2 text-sm font-medium dark:text-black bg-yellow-400 transition border-shadow hover:bg-yellow-300 focus:outline-none  "
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd();
                        closeModal();
                        console.log("add closed");
                      }}
                    >
                      ✔️Add
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
