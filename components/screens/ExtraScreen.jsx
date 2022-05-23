/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import Modal from "../modals/Modal";
import { GET_FAVICON_FROM_SITE_LINK } from "../utils/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
function ChooseMeMyExtra() {
  const {
    certifications,
    setCertifications,
    setChangeDone,
    experienceList,
    setExperienceList,
  } = useSimplyContext();
  dayjs.extend(relativeTime);
  return (
    <div className="mt-4">
      <Certification
        certifications={certifications}
        setCertifications={setCertifications}
        setChangeDone={setChangeDone}
      />
      <Experience
        experienceList={experienceList}
        setExperienceList={setExperienceList}
        setChangeDone={setChangeDone}
      />
    </div>
  );
}

function Certification({ certifications, setCertifications, setChangeDone }) {
  const [showAdd, setShowAdd] = useState(false);
  const [certificate, setCertificate] = useState({
    certi_link: "",
    certi_title: "",
    certi_issued: "",
  });

  const handleSubmit = () => {
    setCertifications((prev) => [...prev, { ...certificate }]);
    setChangeDone(true);
  };

  const handleRemoveCertificate = (c) => {
    setCertifications(
      certifications.filter((prev) => prev.certi_title != c.certi_title)
    );
  };

  return (
    <div className="">
      <h1 className="font-semibold text-lg">Certifications</h1>

      {certifications?.length == 0 ? (
        <></>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3 ">
          {certifications.map((certi, i) => {
            return (
              <div
                key={i}
                className=" rounded-md w-full sm:w-[22rem] flex gap-2  border-2  border-black "
              >
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
                    Issued on {dayjs(certi.certi_issued).format("MMM YYYY")}
                  </p>
                  <button
                    className="p-1 rounded-md text-xs text-red-500 font-semibold"
                    onClick={() => handleRemoveCertificate(certi)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="p-4 flex justify-center bg-gray-100 rounded-md mt-4">
        <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
          <h1 className="text-lg font-medium leading-6 text-center dark:text-white">
            Add Certificate
          </h1>
          <div className="">
            <InputField
              text="Certificate title"
              inputType={"text"}
              onchange={(e) => {
                setCertificate((prev) => ({
                  ...prev,
                  certi_title: e.target.value,
                }));
              }}
            />
            <InputField
              text="Certificate link"
              inputType={"text"}
              onchange={(e) => {
                setCertificate((prev) => ({
                  ...prev,
                  certi_link: e.target.value,
                }));
              }}
            />
            <InputField
              text="Certificate issued on"
              inputType={"date"}
              onchange={(e) => {
                setCertificate((prev) => ({
                  ...prev,
                  certi_issued: e.target.value,
                }));
              }}
            />
          </div>
        </Modal>
        <button className="font-bold" onClick={() => setShowAdd(!showAdd)}>
          +Add Certification
        </button>
      </div>
    </div>
  );
}

function Experience({ experienceList, setExperienceList, setChangeDone }) {
  const [showAdd, setShowAdd] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [experience, setExperience] = useState({
    title: "",
    company_name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_currently_working: "",
  });
  const handleSubmit = () => {
    setExperienceList((prev) => [...prev, { ...experience }]);
    setExperience({
      title: "",
      company_name: "",
      description: "",
      start_date: "",
      end_date: "",
      is_currently_working: "",
    });
    setChangeDone(true);
  };
  return (
    <div className="mt-4">
      <h1 className="font-semibold text-lg mb-4">Experience</h1>
      {experienceList.length == 0 ? (
        <></>
      ) : (
        <div>
          {experienceList.map((e, i) => {
            return (
              <div key={i}>
                <h2 className="font-bold">{e.title}</h2>
                <p>{e.company_name}</p>
                <p>{e.description}</p>
                <p>
                  {dayjs(e.start_date).format("MMM YYYY")}-
                  {e.end_date
                    ? dayjs(e.end_date).format("MMM YYYY")
                    : "present"}{" "}
                  {e.end_date
                    ? dayjs(e.start_date).from(dayjs(e.end_date),true)
                    : dayjs(e.start_date).fromNow(true)}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="p-4 flex justify-center bg-gray-100 rounded-md mt-4">
        <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
          <h1 className="text-lg font-medium leading-6 text-center dark:text-white">
            Add Experience
          </h1>
          <p className="text-gray-700 mt-2">Title</p>
          <InputField
            text={"Ex:Tech lead"}
            inputType={"text"}
            onchange={(e) => {
              setExperience((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
          <p className="text-gray-700">Company Name</p>
          <InputField
            text={"Ex:Google"}
            inputType={"text"}
            onchange={(e) =>
              setExperience((prev) => ({
                ...prev,
                company_name: e.target.value,
              }))
            }
          />
          <p className="text-gray-700">Description</p>
          <textarea
            className="  dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 p-2 mt-2 mb-3 w-full"
            onChange={(e) =>
              setExperience((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <p className="text-gray-700">Start date</p>
          <InputField
            text={"Start date"}
            inputType={"date"}
            onchange={(e) =>
              setExperience((prev) => ({
                ...prev,
                start_date: e.target.value,
              }))
            }
          />
          <label className="flex mt-3 mb-3">
            <input
              type="checkbox"
              checked={experience.is_currently_working}
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={(e) => {
                setExperience((prev) => ({
                  ...prev,
                  is_currently_working: e.target.checked,
                }));
              }}
            />
            <span className="ml-2 text-gray-700">
              I am currently working here
            </span>
          </label>
          {experience.is_currently_working ? (
            <></>
          ) : (
            <>
              <p className="text-gray-700">End date</p>
              <InputField
                text={"End date"}
                inputType={"date"}
                onchange={(e) =>
                  setExperience((prev) => ({
                    ...prev,
                    end_date: e.target.value,
                  }))
                }
              />
            </>
          )}
        </Modal>
        <button className="font-bold" onClick={() => setShowAdd(!showAdd)}>
          +Add Experience
        </button>
      </div>
    </div>
  );
}

function InputField({ text, onchange, inputType }) {
  return (
    <div>
      <input
        type={inputType}
        className="  dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 p-2 mt-2 mb-3 w-full"
        placeholder={text}
        name={text}
        required
        onChange={onchange}
      />
    </div>
  );
}

export default ChooseMeMyExtra;
