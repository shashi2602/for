import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import axios from "axios";
import Image from "next/image";

function Settings() {
  const tabs = [
    {
      name: "SEO Settings",
      component: <SeoSettings />,
      icon: "🔍",
    },
    {
      name: "Appearance",
      component: <Appearance />,
      icon: "💅",
    },
  ];
  const [tabSelected, setTabSelected] = useState(tabs[0]);
  function handleChangeTab(tab) {
    return tab.component;
  }

  return (
    <div className="w-full mt-4">
      <div className="hidden md:block">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-[20rem] border-2 border-gray-200 rounded-md h-full ">
            {tabs.map((tab, i) => {
              return (
                <div
                  key={i}
                  className={`p-4  font-semibold hover:bg-gray-100 dark:hover:text-black transition ${
                    tabSelected?.name === tab.name
                      ? "bg-gray-100 text-black"
                      : ""
                  } ${i + 1 === tabs.length ? "border-b-0" : "border-b-2"}`}
                  onClick={() => setTabSelected(tab)}
                >
                  {tab.icon} {tab.name}
                </div>
              );
            })}
          </div>
          <div className="h-screen w-full px-3 pl-5">
            {handleChangeTab(tabSelected)}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        {tabs.map((tab, i) => {
          return tab.component;
        })}
      </div>
    </div>
  );
}
function SeoSettings() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const [seo, setSeo] = useState({
    seo_title: currentUser?.seo_settings.seo_title,
    seo_description: currentUser?.seo_settings.seo_description,
    seo_image: currentUser?.seo_settings.seo_image,
  });
  function handleSubmit() {
    setCurrentUser((prev) => ({
      ...prev,
      seo_settings: { ...prev.seo_settings, ...seo },
    }));
    toast.success("saved");
    setChangeDone(true);
  }
  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dh9pspek");

    const fetch = axios
      .post("https://api.cloudinary.com/v1_1/dtpdc2bhh/image/upload", data)
      .then((res) => {
        setSeo((prev) => ({
          ...prev,
          seo_image: res.data.secure_url,
        }));
      });
    toast.promise(fetch, {
      loading: "😅 uploading",
      error: "😱 error while uploading",
      success: "🥳 upload success",
    });
  };

  const handleRemoveImage = () => {
    setSeo((prev) => ({
      ...prev,
      seo_image: "",
    }));
  };
  return (
    <div>
      <h1 className="font-semibold text-lg ">🔍 Seo Settings</h1>
      <div className="mt-4">
        <p className="font-semibold">Seo title</p>
        <span className="font-thin text-gray-500 ">
          <i>*If not present it will take user username as seo title.</i>
        </span>
        <input
          id="seo-title"
          type="text"
          className="  dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 p-4 mt-2 mb-3 w-full"
          placeholder="Seo Title"
          name="seo-title"
          value={seo.seo_title}
          required
          onChange={(e) =>
            setSeo((prev) => ({
              ...prev,
              seo_title: e.target.value,
            }))
          }
        />
        <p className="pb-2 pt-2 font-semibold">Search description</p>
        <textarea
          id="seo-description"
          className="  dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 p-4  mb-3 w-full"
          placeholder="Seo description"
          name="seo-description"
          required
          value={seo.seo_description}
          onChange={(e) =>
            setSeo((prev) => ({
              ...prev,
              seo_description: e.target.value,
            }))
          }
        />
        <p className=" pt-2 font-semibold">Image for social share</p>
        <span className="font-thin text-gray-500 ">
          <i>
            *image used when you share link on social media, it displays this
            image
          </i>
        </span>

        {seo.seo_image ? (
          <div
            className="relative w-full  my-2 bg-center bg-no-repeat bg-cover border h-[200px] rounded-lg "
            style={{ backgroundImage: `url(${seo.seo_image})` }}
          >
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 px-4 py-2 -mt-2 -mr-2 text-gray-700 bg-white border rounded-full shadow"
            >
              <i className="fa fa-close text-lg"></i>
            </button>
          </div>
        ) : (
          <label
            htmlFor="seoimage"
            className="flex flex-col items-center justify-center px-4 py-16 my-2 rounded-lg tracking-wide uppercase border-2 border-dashed border-black dark:border-white cursor-pointer "
          >
            upload image
          </label>
        )}
        <input
          type="file"
          id="seoimage"
          className="hidden"
          name="seoimage"
          onChange={(e) => {
            uploadImage(e.target.files[0]);
          }}
        />
        <button
          className="px-4 py-1 dark:bg-[#18181B] border-2 border-solid border-black  shadow-[3px_3px_0_0_#000] dark:border-white dark:shadow-[3px_3px_0_0_#fff] hover:shadow-none dark:hover:shadow-none font-semibold rounded-md  transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function Appearance() {
  const list_of_modules = [
    {
      icon: "😆",
      name: "Profile",
    },
    {
      icon: "💪",
      name: "About",
    },
    {
      icon: "🤝",
      name: "Social Media",
    },
    {
      icon: "💻",
      name: "Skills",
    },
    {
      icon: "🛠️",
      name: "Projects",
    },
    {
      icon: "✍️",
      name: "Blogs",
    },
    {
      icon: "🎓",
      name: "Certifications",
    },
    {
      icon: "💼",
      name: "Experience",
    },
    {
      icon: "📝",
      name: "Resume",
    },
  ];
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();

  const handleOnSelect = (module_name) => {
    if(currentUser.hidden_modules.some(md=>md==module_name)){
      setCurrentUser((prev)=>({
        ...prev,
        hidden_modules:currentUser.hidden_modules.filter(m=>m!=module_name)
      }))
    }else{
      setCurrentUser((prev) => ({
        ...prev,
        hidden_modules: [...prev.hidden_modules, module_name],
      }));
    }
    
    setChangeDone(true);
  };
  return (
    <div className="mt-10 s:mt-0">
      <h1 className="font-semibold text-lg mb-2">💅 Appearance</h1>
      <h1 className=" text-base">
        Select the things that you do not wont to display in your profile
      </h1>
      <div className="flex  flex-wrap gap-3 mt-2 ">
        {list_of_modules.map((m, i) => {
          return (
            <div
              key={i}
              className={`px-2 py-2 rounded-md bg-gray-100  dark:bg-[#18181B] flex gap-2 items-center`}
              onClick={() => handleOnSelect(m.name)}
            >
              <p>{m.icon}</p>
              <h1 className="font-semibold">{m.name}</h1>
              <div className="w-5 h-5">
                {currentUser.hidden_modules.some((md) => md == m.name) ? (
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Settings;
