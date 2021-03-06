/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import Link from "next/link";
function ChooseMeBlogs() {
  const { setChangeDone, currentUser, setCurrentUser } = useSimplyContext();
  const [error, setError] = useState("");
  const [blog, setBlogs] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.blog_site.length != 0) {
        for (let i = 0; i < currentUser.blog_site.length; i++) {
          const res = await fetch(
            `/api/blogs/${currentUser.blog_site[i].name}/${currentUser.blog_site[i].username}`
          );
          const data = await res.json();
          if (res.status == 401) {
            setError(data?.msg);
          } else {
            setBlogs((prev) => [...prev, ...data]);
          }
        }
      }
    };
    fetchData();
  }, []);

  const handleFetch = async (site, username) => {
    const res = await fetch(`/api/blogs/${site}/${username}`);
    const data = await res.json();
    if (res.status == 401) {
      setError(data?.msg);
    } else {
      setBlogs((prev) => [...prev, ...data]);
    }
  };

  const handleSelectBlogSite = (siteName) => {
    if (currentUser?.blog_site.some((n) => n.name == siteName)) {
      setCurrentUser((prev) => ({
        ...prev,
        blog_site: [...prev.blog_site.filter((n) => n.name != siteName)],
      }));
      setBlogs((prev) => prev.filter((n) => n.published_on != siteName));
      setError("");
      setChangeDone(true);
    } else {
      if (currentUser?.social.some((s) => s.value == siteName)) {
        setCurrentUser((prev) => ({
          ...prev,
          blog_site: [
            ...currentUser.blog_site,
            {
              name: siteName,
              username: currentUser.social.find((s) => s.value == siteName)
                .link,
            },
          ],
        }));
        handleFetch(
          siteName,
          currentUser.social.find((s) => s.value == siteName).link
        );
        setChangeDone(true);
      } else {
        toast.error(`???? Add ${siteName} in social media`);
      }
    }
  };
  return (
    <div className="w-full  my-4   ">
      <p className="pb-3 font-semibold text-center">
        ?????? Select to add blogs to your for.dev page
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <BlogSelectButton
          onclick={() => handleSelectBlogSite("hashnode")}
          name="hashnode"
          blogSites={currentUser?.blog_site}
          theme={theme}
        />

        <BlogSelectButton
          onclick={() => handleSelectBlogSite("devto")}
          name="devto"
          blogSites={currentUser?.blog_site}
          isdark={true}
          theme={theme}
        />

        <BlogSelectButton
          onclick={() => handleSelectBlogSite("medium")}
          name="medium"
          blogSites={currentUser?.blog_site}
          isdark={true}
          theme={theme}
        />
      </div>
      {error ? <p className="mt-5 text-center">{error}</p> : null}
      <div className="grid grid-cols-3 gap-2 mt-5">
        {blog.map((n, i) => {
          return <BlogCard key={i} blog={n} />;
        })}
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
        {blogSites.some((n) => n.name == name) ? (
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

function BlogCard({ blog }) {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();

  const handlePinBlog = () => {
    setCurrentUser((prev) => ({
      ...prev,
      pinned_blogs: [...prev.pinned_blogs, blog],
    }));
    setChangeDone(true);
  };
  const handleUnPinBlog = () => {
    setCurrentUser((prev) => ({
      ...prev,
      pinned_blogs: prev.pinned_blogs.filter((n) => n.title != blog.title),
    }));
    setChangeDone(true);
  };
  return (
    <div>
      <div className="flex flex-col">
        <div
          className="h-[13rem] w-full relative block overflow-hidden bg-center bg-no-repeat bg-cover rounded-md"
          style={{
            backgroundImage: `url(${blog.image})`,
          }}
        >
          <span className="absolute z-10 inline-flex items-center p-2 text-xs font-semibold  hover:bg-black/5 rounded-full right-4 top-4">
            {currentUser?.pinned_blogs?.some((n) => n.title == blog.title) ? (
              <button onClick={handleUnPinBlog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-red-500"
                >
                  <path d="M8 17h2v5l-2 2v-7zm2-11.5c0-2.319 1.219-4.35 3.047-5.5h-9.047c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-1.358-.145-2.412-.369-3.276-2.678-.803-4.631-3.284-4.631-6.224zm11 0c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.415 1.414 1.414.708-.708-1.414-1.413 1.414-1.414-.708-.708z" />
                </svg>
              </button>
            ) : (
              <button onClick={handlePinBlog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-yellow-300"
                >
                  <path d="M8 17h2v5l-2 2v-7zm2-11.5c0-2.319 1.219-4.35 3.047-5.5h-9.047c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-1.358-.145-2.412-.369-3.276-2.678-.803-4.631-3.284-4.631-6.224zm6.5-4.5c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.695-.697.992.94 2.115-2.169.697.696-2.811 2.867z" />
                </svg>
              </button>
            )}
          </span>
          <Link href={blog.url} passHref>
            <div className="flex flex-col h-full justify-end relative p-4 text-white bg-black bg-opacity-50 cursor-pointer">
              <h1 className="text-lg font-bold">{blog.title}</h1>
              <p className="text-sm font-bold">{blog.published_on}</p>
              <p>{dayjs(blog.published_at).format("MMM YYYY")}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChooseMeBlogs;
