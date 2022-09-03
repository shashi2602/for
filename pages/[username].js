/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import SeoHead from "../components/seo/SeoHead";
import NavBar from "../components/NavBar";
import DefaultTheme from "../themes/DefaultTheme";
import Link from "next/link";
// import NormalTemplate from "../themes/NormalTemplate";

function User({ data, found }) {
  return found ? (
    <>
      <SeoHead data={data} />
      {/* <NormalTemplate profile={data} /> */}
      <DefaultTheme profile={data} />
      <div className="m-10 grid justify-center font-bold">
      <Link href={""}>❤️Simplyfolio</Link>
      </div>
    </>
  ) : (
    <div>
      <NavBar />
      <div className="grid place-content-center h-screen gap-6">
        <p className="sm:text-[10rem] text-8xl text-center">😲🤕</p>
        <p className="text-3xl font-bold">Oohh...Username Not Found</p>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const found = users.some((u) => u.site_username === params.username);
  var data = {};
  if (found) {
    data = users.find((u) => u.site_username === params.username);
  }
  return {
    props: {
      data: data,
      found: found,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const paths = users.map((user) => ({
    params: { username: user.site_username },
  }));

  return { paths, fallback: "blocking" };
}
export default User;
