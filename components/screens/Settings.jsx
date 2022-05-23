import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

function Settings() {
  const [tabSelected, setTabSelected] = useState();

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
  function handleChangeTab(tab) {
    return tab.component;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex  flex-wrap lg:flex-nowrap">
        <div className="w-[20rem] border-2 border-gray-200 rounded-md h-full ">
          {tabs.map((tab, i) => {
            return (
              <div
                key={i}
                className="p-2  font-semibold hover:bg-gray-100 transition border-b-2"
                onClick={() => setTabSelected(tab)}
              >
                {tab.icon} {tab.name}
              </div>
            );
          })}
        </div>
        <div className="h-screen w-full px-3 pl-5">
          {tabSelected ? handleChangeTab(tabSelected) : tabs[0].component}
        </div>
      </div>
    </div>
  );
}
function SeoSettings() {
  const { currentUser } = useSimplyContext();
  const [seoTitle, setSeoTitle] = useState(currentUser?.seo_settings.seo_title);
  const [seoDescription, setSeoDescription] = useState(
    currentUser?.seo_settings.seo_description
  );
  function handleSubmit(e) {
    e.preventDefault();
    updateUserDoc(currentUser.docid, {
      seo_settings: {
        seo_title: seoTitle,
        seo_description: seoDescription,
      },
    });
    toast.success("saved");
  }
  return (
    <div>
      <h1 className="font-semibold text-lg ">Seo Settings</h1>
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
          value={seoTitle}
          required
          onChange={(e) => setSeoTitle(e.target.value)}
        />
        <p className="pb-2 pt-4 font-semibold">Seo description</p>
        <textarea
          id="seo-description"
          className="  dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 p-4  mb-3 w-full"
          placeholder="Seo description"
          name="seo-description"
          required
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
        />
        <button
          className="px-4 py-1 dark:bg-[#18181B] border-2 border-solid border-black  shadow-[3px_3px_0_0_#000] dark:border-white dark:shadow-[3px_3px_0_0_#fff] hover:shadow-none font-semibold rounded-md  transition duration-300 ease-in-out"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
function Themes() {
  return (
    <div className="w-full flex place-content-center bg-gray-100 p-4 rounded-md">
      coming soon
    </div>
  );
}

function Appearance() {
  return (
    <div className="w-full flex place-content-center bg-gray-100 p-4 rounded-md">
      coming soon
    </div>
  );
}
export default Settings;
