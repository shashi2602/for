/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import Modal from "../modals/Modal";
import { GET_FAVICON_FROM_SITE_LINK } from "../utils/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import InputField from "../forms/InputField";
import TextArea from "../forms/TextArea";
import Label from "../forms/Label";
import MarkdownPreview from "../MarkdownPreview";
function ChooseMeMyExtra() {
  const { setChangeDone, currentUser, setCurrentUser } = useSimplyContext();
  dayjs.extend(relativeTime);

  const tabs = [
    {
      name: "Certifications",
      component: (
        <Certification
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangeDone={setChangeDone}
        />
      ),
      icon: "🎓",
    },
    {
      name: "Experience",
      component: (
        <Experience
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangeDone={setChangeDone}
        />
      ),
      icon: "💼",
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

function Certification({ currentUser, setCurrentUser, setChangeDone }) {
  const [showAdd, setShowAdd] = useState(false);
  const [certificate, setCertificate] = useState({
    certi_link: "",
    certi_title: "",
    certi_issued: "",
  });

  const handleSubmit = () => {
    setCurrentUser((prev) => ({
      ...prev,
      certifications: [...prev.certifications, certificate],
    }));
    setChangeDone(true);
  };

  const handleRemoveCertificate = (c) => {
    setCurrentUser((prev) => ({
      ...prev,
      certifications: prev.certifications.filter(
        (p) => p.certi_title != c.certi_title
      ),
    }));
    setChangeDone(true);
  };

  return (
    <div className="">
      <div className="flex justify-between m-b-4 bg-gray-100 dark:bg-[#18181B] p-2 rounded-md">
        <h1 className="font-semibold text-lg">🎓 Certifications</h1>
        <button onClick={() => setShowAdd(!showAdd)}>
          <i className="fa fa-plus"></i> Add Certification
        </button>
      </div>

      {currentUser?.certifications?.length == 0 ? (
        <div className="text-center font-semibold p-4 h-16">
          😰 No Certifications Added
        </div>
      ) : (
        <div className="mt-4 ">
          {currentUser?.certifications.map((certi, i) => {
            return (
              <div
                key={i}
                className=" rounded-md w-full grid grid-flow-col p-2 justify-between gap-2"
              >
                <div className="flex justify-between">
                  <img
                    alt={certi.certi_title}
                    src={GET_FAVICON_FROM_SITE_LINK + certi.certi_link}
                    className="w-[3rem] h-[3rem] rounded-md m-2"
                  />
                  <div className=" p-2">
                    <a href={certi.certi_link}>
                      <p className="font-semibold ">{certi.certi_title}</p>
                    </a>
                    <p className="text-sm text-gray-500 ">
                      Issued on{" "}
                      {certi.certi_issued
                        ? dayjs(certi.certi_issued).format("MMM YYYY")
                        : "No issue date"}
                    </p>
                    <button
                      className="rounded-md text-xs text-red-500 font-bold dark:text-red-400"
                      onClick={() => handleRemoveCertificate(certi)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
        <h1 className="text-lg font-medium leading-6 text-center dark:text-white  ">
          🎓 Certificate
        </h1>
        <div className="mt-2">
          <Label text={"Certificate title"} />
          <InputField
            name={"Certificate title"}
            placeholder="Certificate title"
            type={"text"}
            onchange={(e) => {
              setCertificate((prev) => ({
                ...prev,
                certi_title: e.target.value,
              }));
            }}
          />
          <Label text={"Certificate link"} />
          <InputField
            name={"Certificate link"}
            placeholder="Certificate link"
            type={"text"}
            onchange={(e) => {
              setCertificate((prev) => ({
                ...prev,
                certi_link: e.target.value,
              }));
            }}
          />
          <Label text={"Certificate issued on"} />
          <InputField
            name={"Certificate issued on"}
            placeholder="Certificate issued on"
            type={"date"}
            onchange={(e) => {
              setCertificate((prev) => ({
                ...prev,
                certi_issued: e.target.value,
              }));
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

function Experience({ currentUser, setCurrentUser, setChangeDone }) {
  const [showAdd, setShowAdd] = useState(false);
  const [experience, setExperience] = useState({
    title: "",
    company_name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_currently_working: "",
  });
  const handleSubmit = () => {
    setCurrentUser((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));

    setExperience({
      title: "",
      company_name: "",
      description: "",
      start_date: "",
      end_date: "",
      is_currently_working: "",
      company_link: "",
    });
    setChangeDone(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-4 sm:mt-0">
      <div className="flex justify-between mb-4 bg-gray-100 dark:bg-[#18181B] p-2 rounded-md">
        <h1 className="font-semibold text-lg ">💼 Experience</h1>
        <button onClick={() => setShowAdd(!showAdd)}>
          <i className="fa fa-plus"></i> Add Experience
        </button>
      </div>
      {currentUser?.experiences?.length == 0 ? (
        <div className="text-center font-semibold p-4 h-16">
          😢 No Experience Added
        </div>
      ) : (
        <div className="grid gap-2">
          {currentUser?.experiences?.map((e, i) => {
            return (
              <div key={i} className="flex flex-col border-b-2  p-4">
                <div className="flex gap-2">
                  <div>
                    {e?.company_link ? (
                      <Image
                        alt={e.company_name}
                        src={GET_FAVICON_FROM_SITE_LINK + e.company_link}
                        height={20}
                        width={20}
                        layout={"fixed"}
                      />
                    ) : (
                      <i className="fa fa-building" aria-hidden="true"></i>
                    )}
                  </div>
                  <div>
                    <h1 className="capitalize">
                      {e?.title}{" "}
                      <a
                        href={e?.company_link}
                        className="text-yellow-500 dark:text-yellow-300 font-semibold hover:underline"
                      >
                        @{e?.company_name}
                      </a>
                    </h1>
                    <p className="capitalize  text-gray-500">
                      {dayjs(e.start_date).format("MMM YYYY")} {" - "}
                      {e.end_date
                        ? dayjs(e.end_date).format("MMM YYYY")
                        : "present"}{" "}
                    </p>
                  </div>
                </div>
                <div className="prose text-justify dark:prose-invert max-w-max">
                  <MarkdownPreview about={e.description} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
        <h1 className="text-lg font-medium leading-6 text-center dark:text-white m-2">
          💼 Experience
        </h1>
        <Label text={"Title"} />
        <InputField
          name={"title"}
          placeholder={"Ex:Tech lead"}
          type={"text"}
          onchange={handleChange}
        />
        <Label text="Company Name" />
        <InputField
          name={"company_name"}
          placeholder={"Ex:Google"}
          type={"text"}
          onchange={handleChange}
        />
        <div className="flex justify-between">
          <Label text={"Description"} />
          <p className="text-xs ">Markdown support</p>
        </div>
        <TextArea
          name={"description"}
          placeholder="Ex:worked on Data Science"
          onchange={handleChange}
        />
        <Label text={"Start date"} />
        <InputField
          name={"start_date"}
          placeholder={"Start date"}
          type={"date"}
          onchange={handleChange}
        />
        <Label text="Company url"></Label>
        <InputField
          name={"company_link"}
          placeholder={"https://somecompany.com"}
          type={"text"}
          onchange={handleChange}
        />
        <label className="flex mt-3 mb-3">
          <input
            type="checkbox"
            checked={experience.is_currently_working}
            className="form-checkbox h-5 w-5 text-gray-600 "
            onChange={(e) => {
              setExperience((prev) => ({
                ...prev,
                is_currently_working: e.target.checked,
              }));
            }}
          />
          <span className="ml-2 text-gray-700 dark:text-white">
            I am currently working here
          </span>
        </label>
        {experience.is_currently_working ? (
          <></>
        ) : (
          <>
            <Label text={"End date"} />
            <InputField
              name={"end_date"}
              placeholder={"End date"}
              type={"date"}
              onchange={handleChange}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

export default ChooseMeMyExtra;
