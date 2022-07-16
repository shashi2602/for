/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DarkMode from "../components/buttons/DarkMode";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import NormalTemplate from "../components/Themes/DefaultTheme";
import SeoHead from "../components/seo/SeoHead";

function User({ data,found }) {
  return (
    !found?<>
    <SeoHead data={data} />
    <DarkMode />
    <NormalTemplate profile={data} />
  </>:<div>user not found</div>
  );
}

export async function getStaticProps({ params }) {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const found=users.some((u) => u.username === params.username);
  const data = users.find((user) => user.site_username == params.username);
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
