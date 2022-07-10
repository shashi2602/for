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
    {
      name: "Themes",
      component: <Themes />,
      icon: "👁",
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
            className="relative w-full my-2 bg-center bg-no-repeat bg-cover border h-full rounded-lg p-[200px]"
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
            className="flex flex-col items-center justify-center px-4 py-16 my-2 rounded-lg tracking-wide uppercase border-2 border-dashed cursor-pointer hover:shadow-xl"
          >
            upload
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
function Themes() {
  return (
    <div className="w-full flex place-content-center bg-gray-100 dark:bg-black/40  p-4 rounded-md">
      coming soon
    </div>
  );
}

function Appearance() {
  return (
    <div className="w-full flex place-content-center bg-gray-100 dark:bg-black/40  p-4 rounded-md">
      coming soon
    </div>
  );
}
export default Settings;
