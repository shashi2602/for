/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
export default function Modal({
  children,
  show,
  showAdd = true,
  handleAdd,
  heading,
  disableSave = false,
}) {
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
              <div className="inline-block w-full dark:bg-[#121212] bg-gray-100 max-w-md  my-8 overflow-hidden text-left align-middle transition-all transform   shadow-[3px_3px_0_0_#000] dark:shadow-none  border-black border-2  rounded-md ">
                <div className="flex justify-between mb-2 border-b-2 p-3 border-black">
                  <h1 className="text-lg pl-2 font-medium leading-6 dark:text-white ">
                    {heading}
                  </h1>
                  <i
                    className="fa fa-times text-lg font-medium hover:cursor-pointer"
                    aria-hidden="true"
                    onClick={() => {
                      closeModal();
                    }}
                  ></i>
                </div>
                <div className="p-6">
                  {children}
                  {showAdd && (
                    <div className=" mt-4 flex justify-end">
                      <button
                        type="button"
                        className=" px-6 py-2 text-sm font-medium dark:text-black bg-yellow-400 transition border-shadow hover:bg-yellow-300 focus:outline-none disabled:bg-yellow-300 disabled:cursor-not-allowed "
                        disabled={disableSave}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAdd();
                          closeModal();
                          console.log("add closed");
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
