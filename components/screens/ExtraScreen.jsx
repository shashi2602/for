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
    setChangeDone(true);
  };

  return (
    <div className="">
      <div className="flex justify-between m-b-4">
        <h1 className="font-semibold text-lg">🎓 Certifications</h1>
        <button onClick={() => setShowAdd(!showAdd)}>
          <i className="fa fa-plus"></i> Add Certification
        </button>
      </div>

      {certifications?.length == 0 ? (
        <div className="text-center font-semibold p-4 h-16">
          😰 No Certifications Added
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3 ">
          {certifications.map((certi, i) => {
            return (
              <div
                key={i}
                className=" rounded-md w-full grid grid-flow-col bg-gray-100  dark:bg-black/40 p-2 justify-between sm:w-[22rem] gap-2"
              >
                <div className="flex ">
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
                  </div>
                </div>
                <button
                  className="p-1 rounded-md text-xs text-red-500 font-bold dark:text-red-400"
                  onClick={() => handleRemoveCertificate(certi)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
      <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
        <h1 className="text-lg font-medium leading-6 text-center dark:text-white  ">
          Add Certificate
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
      {/* <div className="p-4 text-center w-[20rem] bg-yellow-200  text-yellow-500 rounded-md mt-4 ">
        <button className="font-bold " onClick={() => setShowAdd(!showAdd)}>
          <i className="fa fa-plus"></i> Add Certification
        </button>
      </div> */}
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
      <div className="flex justify-between mb-4">
        <h1 className="font-semibold text-lg ">💼 Experience</h1>
        <button onClick={() => setShowAdd(!showAdd)}>
          <i className="fa fa-plus"></i> Add Experience
        </button>
      </div>
      {experienceList.length == 0 ? (
        <div className="text-center font-semibold p-4 h-16">
          😢 No Experience Added
        </div>
      ) : (
        <div className="grid grid-flow-col auto-cols-max gap-2">
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
                    ? dayjs(e.start_date).from(dayjs(e.end_date), true)
                    : dayjs(e.start_date).fromNow(true)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Modal show={showAdd} showAdd={true} handleAdd={handleSubmit}>
        <h1 className="text-lg font-medium leading-6 text-center dark:text-white">
          Add Experience
        </h1>
        <Label text={"Title"} />
        <InputField
          name={"title"}
          placeholder={"Ex:Tech lead"}
          type={"text"}
          onchange={(e) => {
            setExperience((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
        <Label text="Company Name" />
        <InputField
          name={"Company Nam"}
          placeholder={"Ex:Google"}
          type={"text"}
          onchange={(e) =>
            setExperience((prev) => ({
              ...prev,
              company_name: e.target.value,
            }))
          }
        />
        <Label text={"Description"} />
        <TextArea
          name={"Description"}
          placeholder="Ex:worked on Data Science"
          onChange={(e) =>
            setExperience((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <Label text={"Start date"} />
        <InputField
          name={"Start date"}
          placeholder={"Start date"}
          type={"date"}
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
              name={"End date"}
              placeholder={"End date"}
              type={"date"}
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
    </div>
  );
}

// function InputField({ placeholder, onchange, type }) {
//   return (
//     <div>
//       <input
//         type={type}
//         className="  dark:bg-[#18181B] rounded border-2 border-black  h-15 p-2 mt-2 mb-3 w-full"
//         placeholder={placeholder}
//         name={placeholder}
//         required
//         onChange={onchange}
//       />
//     </div>
//   );
// }

export default ChooseMeMyExtra;
