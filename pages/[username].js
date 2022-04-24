/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DarkMode from "../components/ui/DarkMode";
import Footer from "../components/ui/Footer";
import UserAboutMarkdown from "../components/ui/UserAboutMarkdown";
import UserDetails from "../components/ui/UserDetails";
import UserImage from "../components/ui/UserImage";
import UserSocial from "../components/ui/UserSocial";
import UserStack from "../components/ui/UserStack";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import NormalTemplete from "../components/ui/normal_templete";

function User({ data }) {
  console.log(data);
  return (
    <>
      <DarkMode />
      <NormalTemplete profile={data} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const data = users.find((user) => user.site_username == params.username);
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}
export default User;
