/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutPage from "../components/Layout/LayoutPage";
import { useSimplyContext } from "../context/SimplyContext";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

import unfi from "/public/tokyo-binoculars-in-web-space.png";
import Image from "next/image";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import nookies from "nookies";

function DashBoard({ found }) {
  const { user, userNameNotFound, currentUser, signOut } = useSimplyContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div className="dark:bg-gray-800">
      {!found ? (
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

export async function getServerSideProps(context) {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const cookies = nookies.get(context);
  const found = users.some((u) => u.uid === cookies.UID);
  return {
    props: {
      usernameslist: users,
      found: found,
    }, // will be passed to the page component as props
  };
}
