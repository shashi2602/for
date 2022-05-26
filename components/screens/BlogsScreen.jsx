import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
function ChooseMeBlogs() {
  const { blogSites, setBlogSites, setChangeDone, selectedSocial } =
    useSimplyContext();
  const { theme } = useTheme();
  const handleSelectBlogSite = (siteName) => {
    if (blogSites == siteName) {
      setBlogSites("");
    } else {
      if (selectedSocial.some((s) => s.value == siteName)) {
        setBlogSites(siteName);
        setChangeDone(true);
      } else {
        toast.error(`😜 Add ${siteName} in social media`);
      }
    }
  };
  return (
    <div className="w-full  my-4   ">
      <p className="pb-3 font-semibold text-center">
        ✍️ Select to add blogs to your for.dev page
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <BlogSelectButton
          onclick={() => handleSelectBlogSite("hashnode")}
          name="hashnode"
          blogSites={blogSites}
          theme={theme}
        />

        <BlogSelectButton
          onclick={() => handleSelectBlogSite("devto")}
          name="devto"
          blogSites={blogSites}
          isdark={true}
          theme={theme}
        />

        <BlogSelectButton
          onclick={() => handleSelectBlogSite("medium")}
          name="medium"
          blogSites={blogSites}
          isdark={true}
          theme={theme}
        />
      </div>
    </div>
  );
}

function BlogSelectButton({ onclick, blogSites, name, isdark = false, theme }) {
  return (
    <button
      className="flex items-center  gap-3 px-8 py-4 font-bold  border-shadow "
      onClick={onclick}
    >
      <Image
        alt={name}
        src={
          isdark
            ? theme == "dark"
              ? `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${name}-dark.svg`
              : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${name}.svg`
            : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${name}.svg`
        }
        height={20}
        width={20}
      />
      <p className="font-semibold capitalize">{name}</p>
      <div className="w-5 h-5">
        {blogSites == name ? (
          <svg
            className="  text-black dark:text-white top-4 right-4 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
}

export default ChooseMeBlogs;
