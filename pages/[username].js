/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DarkMode from "../components/buttons/DarkMode";
import { userRef } from "../services/user.services";
import { getDocs } from "firebase/firestore";
import NormalTemplete from "../components/Themes/DefaultTheme";
import Head from "next/head";
import { SITE_ENDPOINT } from "../components/utils/constants";

function User({ data }) {
  const twitter = data.social.find((t) => t.value == "twitter");
  return (
    <>
      <Head>
        <title>
          {data.username} | {data.expertise}
        </title>
        <link rel="icon" href={data.profile_img} />
        <meta name="title" content={data?.seo_settings?.seo_title} />
        <meta
          name="description"
          content={data?.seo_settings?.seo_description}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_ENDPOINT + data.site_username} />
        <meta property="og:title" content={data?.seo_settings?.seo_title} />
        <meta
          property="og:description"
          content={data?.seo_settings?.seo_description}
        />
        <meta property="og:image" content={data.profile_img} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"@" + twitter.link} />
        <meta
          property="twitter:title"
          content={data?.seo_settings?.seo_title}
        />
        <meta
          property="twitter:description"
          content={data?.seo_settings?.seo_description}
        />
        <meta property="twitter:image" content={data.profile_img} />
      </Head>
      <DarkMode />
      <NormalTemplete profile={data} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const snapshot = await getDocs(userRef);
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data() });
  });
  const data = users.find((user) => user.site_username == params.username);
  return {
    props: {
      data: data,
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
