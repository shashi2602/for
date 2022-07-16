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
import FormGroup from "../forms/FormGroup";
function ChooseMeMyExtra() {
  const { setChangeDone, currentUser, setCurrentUser } = useSimplyContext();
  dayjs.extend(relativeTime);
  const tabs = [
    {
      name: "Certifications",
      icon: "🎓",
    },
    {
      name: "Experience",
      icon: "💼",
    },
    {
      name: "Resume",
      icon: "📝",
    },
  ];
  const [tabSelected, setTabSelected] = useState(tabs[0]);

  return (
    <div className="w-full mt-4">
      <div className="hidden md:block">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-[20rem] border-2 border-gray-200 rounded-md h-full ">
            {tabs.map((tab, i) => {
              return (
                <div
                  key={i}
                  className={`p-4  font-semibold hover:bg-gray-100 dark:hover:text-black transition hover:cursor-pointer ${
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
            {tabSelected.name === "Experience" && (
              <Experience
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setChangeDone={setChangeDone}
              />
            )}
            {tabSelected.name === "Certifications" && (
              <Certification
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setChangeDone={setChangeDone}
              />
            )}
            {tabSelected.name === "Resume" && (
              <Resume
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setChangeDone={setChangeDone}
              />
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden grid gap-2">
        <Experience
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangeDone={setChangeDone}
        />
        <Certification
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangeDone={setChangeDone}
        />
        <Resume
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangeDone={setChangeDone}
        />
      </div>
    </div>
  );
}

function Certification({ currentUser, setCurrentUser, setChangeDone }) {
  const [showAdd, setShowAdd] = useState(false);
  const [certificate, setCertificate] = useState({
    certi_link: "",
    certi_title: "",
    certi_issued_by: "",
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
        <button onClick={() => setShowAdd(!showAdd)} className="font-semibold">
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
                    <p>{certi.certi_issued_by}</p>
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
      <Modal
        show={showAdd}
        showAdd={true}
        handleAdd={handleSubmit}
        heading="🎓 Add Certificate"
        disableSave={certificate.certi_title === ""}
      >
        <div className="mt-2">
          <Label text={"Certificate title"} />
          <InputField
            name={"Certificate title"}
            placeholder="Ex:Reactjs Bootcamp"
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
          <Label text={"Certificate issued by"} />
          <InputField
            name={"Certificate link"}
            placeholder="Ex:Udemy"
            type={"text"}
            onchange={(e) => {
              setCertificate((prev) => ({
                ...prev,
                certi_issued_by: e.target.value,
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
  const [editId, setEditId] = useState();
  const initialState = {
    id: currentUser.experiences?.length + 1,
    title: "",
    company_name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_currently_working: "",
  };
  const [experience, setExperience] = useState({ ...initialState });

  const handleSubmit = () => {
    if (editId) {
      const editExperience = [...currentUser.experiences];
      const index = editExperience.findIndex((exp) => exp.id == editId);
      editExperience[index] = experience;
      setCurrentUser((prev) => ({
        ...prev,
        experiences: editExperience,
      }));
      setEditId(null);
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        experiences: [...prev.experiences, experience],
      }));
    }
    setExperience({ ...initialState });
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
  const handleEdit = (id) => {
    // setEditData();
    setExperience({ ...currentUser.experiences.find((exp) => exp.id == id) });
    setEditId(id);
    setShowAdd(!showAdd);
  };
  const handleDelete = (id) => {
    setCurrentUser((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id != id),
    }));
    setChangeDone(true);
  };
  return (
    <div className="mt-4 sm:mt-0">
      <div className="flex justify-between mb-4 bg-gray-100 dark:bg-[#18181B] p-2 rounded-md">
        <h1 className="font-semibold text-lg ">💼 Experience</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="font-semibold">
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
              <div
                key={i}
                className="flex flex-col border-2 rounded dark:border-[#18181B]   p-4"
              >
                <div className="flex justify-between">
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
                          className=" font-bold  hover:underline"
                        >
                          @{e?.company_name}
                        </a>
                      </h1>
                      <p className="capitalize  text-gray-500 ">
                        {dayjs(e.start_date).format("MMM YYYY")} {" - "}
                        {e.end_date
                          ? dayjs(e.end_date).format("MMM YYYY")
                          : "present"}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-gray-100 px-4 rounded-md dark:bg-[#18181B] h-[2rem] "
                      onClick={() => handleEdit(e.id)}
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-gray-100 px-4 rounded-md dark:bg-[#18181B] h-[2rem]"
                      onClick={() => handleDelete(e.id)}
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
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

      <Modal
        show={showAdd}
        showAdd={true}
        handleAdd={handleSubmit}
        heading=" 💼 Add Experience"
        disableSave={experience.title === ""}
      >
        <Label text={"Title"} />
        <InputField
          name={"title"}
          placeholder={"Ex:Tech lead"}
          type={"text"}
          onchange={handleChange}
          value={experience.title}
        />
        <Label text="Company Name" />
        <InputField
          name={"company_name"}
          placeholder={"Ex:Google"}
          type={"text"}
          onchange={handleChange}
          value={experience.company_name}
        />
        <div className="flex justify-between">
          <Label text={"Description"} />
          <p className="text-xs ">Markdown support</p>
        </div>
        <TextArea
          name={"description"}
          placeholder="Ex:worked on Data Science"
          onchange={handleChange}
          value={experience.description}
        />
        <Label text={"Start date"} />
        <InputField
          name={"start_date"}
          placeholder={"Start date"}
          type={"date"}
          onchange={handleChange}
          value={experience.start_date}
        />
        <Label text="Company url"></Label>
        <InputField
          name={"company_link"}
          placeholder={"https://somecompany.com"}
          type={"text"}
          onchange={handleChange}
          value={experience.end_date}
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
              value={experience.end_date}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

function Resume({ currentUser, setCurrentUser, setChangeDone }) {
  return (
    <div>
      <div className="flex justify-between m-b-4 bg-gray-100 dark:bg-[#18181B] p-2 rounded-md">
        <h1 className="font-semibold text-lg">📝 Resume</h1>
      </div>
      <span className="font-thin text-gray-500 my-4">
        <i>
          * simply paste the link of your resume here and click on save changes
        </i>
      </span>
      <div className="mt-2">
        <InputField
          name={"resume"}
          placeholder={"Add resume link here and click on save changes"}
          value={currentUser?.resume}
          onchange={(e) => {
            setCurrentUser((prev) => ({ ...prev, resume: e.target.value }));
            setChangeDone(true);
          }}
        />
      </div>
    </div>
  );
}
export default ChooseMeMyExtra;
