import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";

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
  const { currentUser, setCurrentUser } = useSimplyContext();
  const [seo, setSeo] = useState({
    seo_title: currentUser?.seo_settings.seo_title,
    seo_description: currentUser?.seo_settings.seo_description,
  });
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      seo_settings: [...prev, seo],
    }));
    toast.success("saved");
  }
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
        <p className="pb-2 pt-4 font-semibold">Seo description</p>
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
        <button
          className="px-4 py-1 dark:bg-[#18181B] border-2 border-solid border-black  shadow-[3px_3px_0_0_#000] dark:border-white dark:shadow-[3px_3px_0_0_#fff] hover:shadow-none font-semibold rounded-md  transition duration-300 ease-in-out"
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
