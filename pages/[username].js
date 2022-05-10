/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DarkMode from "../components/Themes/DarkMode";
// import Footer from "../components/Themes/Footer";
// import UserAboutMarkdown from "../components/Themes/UserAboutMarkdown";
// import UserDetails from "../components/Themes/UserDetails";
// import UserImage from "../components/Themes/UserImage";
// import UserSocial from "../components/Themes/UserSocial";
// import UserStack from "../components/Themes/UserStack";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import NormalTemplete from "../components/Themes/DefaultTheme";

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
