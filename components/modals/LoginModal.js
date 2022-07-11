import React, { Fragment, useState } from "react";
import GoogleBtn from "../buttons/GoogleButton";
import GithubBtn from "../buttons/GithubButton";
import Modal from "./Modal";

function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(!showModal)}
        className="px-4 py-2 text-sm font-semibold text-black bg-yellow-400    p-3 transition border-2 border-black  rounded-md shadow-[3px_3px_0_0_#000] dark:border-[#0B0B0B] dark:shadow-[3px_3px_0_0_#0B0B0B] hover:shadow-none"
      >
        Login
      </button>

      <Modal show={showModal} disableSave={true} showAdd={false}>
        <h1
          as="h3"
          className="text-lg font-medium leading-6 text-center dark:text-white"
        >
          what to see the wonders?
        </h1>

        <div className="mt-3 flex gap-2 w-full justify-center ">
          <GoogleBtn />
          <br />
          <GithubBtn />
        </div>
      </Modal>
    </>
  );
}
export default LoginModal;
