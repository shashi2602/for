import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
function ChooseMeBlogs() {
  const { blogSites, setBlogSites, setChangeDone, selectedSocial } =
    useSimplyContext();
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
        <button
          className={`flex gap-3 items-center justify-center px-8 py-4 font-bold transition border-2 border-black rounded-md dark:border-white dark:shadow-[3px_3px_0_0_#fff]  shadow-[6px_6px_0_0_#000] hover:shadow-none ${
            blogSites == "hashnode" ? "" : ""
          }`}
          onClick={() => handleSelectBlogSite("hashnode")}
        >
          <svg
            className="w-6 h-6 text-[#3466f6]"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
          </svg>
          <p className="font-semibold">Hashnode</p>
          {blogSites == "hashnode" ? (
            <svg
              className=" w-5 h-5 text-black dark:text-white top-4 right-4 "
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
        </button>
        <button
          className="flex  gap-3 items-center justify-center px-8 py-4 font-bold transition border-2 border-black dark:border-white dark:shadow-[3px_3px_0_0_#fff] rounded-md shadow-[6px_6px_0_0_#000] hover:shadow-none "
          onClick={() => handleSelectBlogSite("devto")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="dev.to"
            className="w-6 h-6"
            viewBox="0 0 512 512"
          >
            <rect width="512" height="512" rx="15%" />
            <path
              fill="#fff"
              d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
            />
          </svg>
          <p className="font-semibold">Dev.to</p>
          {blogSites == "devto" ? (
            <svg
              className=" w-5 h-5 text-black dark:text-white top-4 right-4 "
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
        </button>

        <button
          className="flex  gap-3 items-center justify-center px-8 py-4 font-bold transition border-2 border-black  dark:border-white dark:shadow-[3px_3px_0_0_#fff] rounded-md shadow-[6px_6px_0_0_#000] hover:shadow-none "
          onClick={() => handleSelectBlogSite("medium")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="dev.to"
            className="w-6 h-6"
            viewBox="0 0 512 512"
          >
            <path
              d="M483.86,112.345h-26.699c-6.952,0-25.143,7.552-25.143,13.981v233.467c0,6.445,18.191,11.729,25.143,11.729h26.699v51.835
		H311.052v-51.835h34.57V129.615h-6.016L256.42,423.356h-64.406l-82.11-293.741h-6.219v241.906h34.555v51.835H0v-51.835h19.173
		c7.527,0,15.383-5.283,15.383-11.729V126.326c0-6.43-7.855-13.981-15.383-13.981H0V60.504h179.155l58.496,207.342h1.574
		l59.073-207.342H483.86V112.345z"
            />
          </svg>
          <p className="font-semibold">Medium</p>
          {blogSites == "medium" ? (
            <svg
              className=" w-5 h-5 text-black dark:text-white top-4 right-4 "
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
        </button>
      </div>
    </div>
  );
}

export default ChooseMeBlogs;
