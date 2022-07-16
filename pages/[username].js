/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DarkMode from "../components/buttons/DarkMode";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import NormalTemplate from "../components/Themes/DefaultTheme";
import SeoHead from "../components/seo/SeoHead";
import NavBar from "../components/NavBar";

function User({ data,found }) {
  return (
    found?<>
    <SeoHead data={data} />
    <DarkMode />
    <NormalTemplate profile={data} />
  </>:<div>
    <NavBar/>
    <div className="grid place-content-center h-screen gap-6">
    <p className="sm:text-[10rem] text-8xl text-center">
    😲🤕
    </p>
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
  const found=users.some((u) => u.site_username === params.username);
  var data = {};
  if(found){
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
