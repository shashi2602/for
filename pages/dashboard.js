/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutPage from "../components/Layout/LayoutPage";
import { useSimplyContext } from "../context/SimplyContext";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

import sample_image from "/public/tokyo-binoculars-in-web-space.png";
import Image from "next/image";
// import nookies from "nookies";

function DashBoard() {
  const { user, currentUser, signOut, found } = useSimplyContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <div>
      {!found ? (
        <>
          <NavBar />
          <div className="text-center mt-[5rem] ">
            <Image
              alt="username_not_found_image"
              src={sample_image}
              height={300}
              width={400}
            />
            <h1 className="text-[3rem] font-semibold">
              No username found for your account
            </h1>
            <p className="my-2">Please signout and create username</p>

            <button
              className="bg-gray-100 text-black font-semibold px-6 py-2 rounded"
              onClick={signOut}
            >
              signout
            </button>
          </div>
        </>
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

// export async function getServerSideProps(context) {
//   const res = await fetch(`${SERVER}/api/users`);
//   const data = await res.json();
//   const cookies = nookies.get(context);
//   const found = data.users.some((u) => u === cookies.UID);
//   return {
//     props: {
//       found: found,
//       users: data,
//     }, // will be passed to the page component as props
//   };
// }
