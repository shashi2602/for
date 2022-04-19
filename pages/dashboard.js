/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutPage from "../components/Layout/LayoutPage";
import { useSimplyContext } from "../context/SimplyContext";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

import unfi from "/public/tokyo-binoculars-in-web-space.png";
import Image from "next/image";

function DashBoard() {
  const { user, userNamesList, currentUser, signOut } = useSimplyContext();
  const [userNameNotFound, setUserNameNotFound] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const find = userNamesList.some((u) => u.uid === user.uid);
    if (find) {
      setUserNameNotFound(false);
    } else {
      setUserNameNotFound(true);
    }
  }, [userNamesList]);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div>
      {userNameNotFound ? (
        <div>
          <NavBar />
          <div className="text-center mt-[5rem]">
            <Image
              alt="username_not_found_image"
              src={unfi}
              height={300}
              width={400}
            />
            <h1 className="text-[3rem] font-semibold">
              🧐 No username found for your account
            </h1>
            <p className="my-2">Please 🙌 signout and create username</p>

            <button
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
              onClick={signOut}
            >
              signout
            </button>
          </div>
        </div>
      ) : currentUser ? (
        <LayoutPage />
      ) : (
        <div className="flex h-screen">
          <div className="m-auto">
            <h1 className="text-[3rem] font-semibold">Loading...</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
