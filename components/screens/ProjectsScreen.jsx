/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";
import GithubProjectsBtn from "../buttons/GithubProjectsButton";
import InputField from "../forms/InputField";
import TextArea from "../forms/TextArea";
import { firstLetterUpper } from "../utils/textutils";

function ChooseMeProjects() {
  const { projectList, setProjectList, setChangeDone } = useSimplyContext();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectStacks, setProjectStacks] = useState("");
  const [projectSource, setProjectSource] = useState("");
  const [projectLive, setProjectLive] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleAdd = () => {
    if (projectId) {
      const in_edit = projectList.find((project) => project.id === projectId);
      if (in_edit) {
        in_edit.title = projectTitle;
        in_edit.short_info = projectDesc;
        in_edit.stacks = projectStacks;
        in_edit.live_link = projectLive;
        in_edit.source_code_link = projectSource;
      }
    } else {
      const new_proj = {
        id: "project-" + projectList.length + 1,
        title: firstLetterUpper(projectTitle),
        short_info: firstLetterUpper(projectDesc),
        stacks: projectStacks,
        live_link: projectLive,
        source_code_link: projectSource,
      };
      console.log(new_proj);
      setProjectList((prev) => [...prev, new_proj]);
    }
    setChangeDone(true);
    setProjectTitle("");
    setProjectDesc("");
    setProjectStacks("");
    setProjectSource("");
    setProjectLive("");
    setProjectId("");
  };
  const handleDelete = (id) => {
    setProjectList(projectList.filter((p) => p.id != id));
    setChangeDone(true);
  };

  const handleEdit = (id) => {
    const edit_project = projectList.find((project) => project.id === id);
    setProjectId(edit_project.id);
    setProjectTitle(edit_project.title);
    setProjectDesc(edit_project.short_info);
    setProjectStacks(edit_project.stacks);
    setProjectSource(edit_project.live_link);
    setProjectLive(edit_project.source_code_link);
    setChangeDone(true);
  };

  return (
    <div className=" mt-2 ">
      <div className="flex justify-between m-b-4">
        <h1 className="font-semibold text-lg">🛠️ Projects</h1>
        <div>
          <GithubProjectsBtn />
          <button
            className="ml-4 bg-black/5 dark:bg-black/40 dark:text-white font-semibold rounded-md p-2 text-sm"
            onClick={handleAdd}
          >
            ✔️Add
          </button>
        </div>
      </div>

      <div className="grid grid-row p-4">
        <InputField
          placeholder="Project name"
          value={projectTitle}
          onchange={(e) => {
            setProjectTitle(e.target.value);
          }}
        />
        <TextArea
          placeholder="About project "
          value={projectDesc}
          onchange={(e) => {
            setProjectDesc(e.target.value);
          }}
        ></TextArea>
        <div className="grid sm:grid-cols-3 sm:gap-2 ">
          <InputField
            placeholder="used to build project ',' separated  "
            value={projectStacks}
            onchange={(e) => {
              setProjectStacks(e.target.value);
            }}
          />
          <InputField
            placeholder="source link(Github..etc)"
            value={projectSource}
            onchange={(e) => {
              setProjectSource(e.target.value);
            }}
          />
          <InputField
            placeholder="Does project is live? Then provide link"
            value={projectLive}
            onchange={(e) => {
              setProjectLive(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-2  pt-4 mx-4">
        {projectList?.map((p, i) => {
          return (
            <div
              className=" w-full grid grid-flow-row justify-between sm:w-auto md:w-auto  dark:border-none dark:bg-black/40 bg-gray-100 rounded-md p-4"
              key={i}
            >
              <div className="flex justify-between">
                <Link href={p?.source_code_link} passHref>
                  <a target={"_blank"}>
                    <i className="fa fa-github text-2xl "></i>
                  </a>
                </Link>

                <div className="flex items-center -space-x-4 hover:space-x-1">
                  <Link href={p.live_link} passHref>
                    <a target={"_blank"}>
                      <button
                        className="z-10 block p-2 text-green-700 transition-all bg-green-100  rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                        type="button"
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
                            d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"
                          />
                        </svg>
                      </button>
                    </a>
                  </Link>

                  <button
                    className="z-20 block p-2 text-blue-700 transition-all bg-blue-100   rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                    type="button"
                    onClick={() => {
                      handleEdit(p.id);
                    }}
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
                    className="z-30 block p-2 text-red-700 transition-all bg-red-100   rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                    type="button"
                    onClick={() => {
                      handleDelete(p.id);
                    }}
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

              <div>
                <p className="font-semibold my-2">
                  {firstLetterUpper(p.title)}
                </p>
                <p className="text-justify">{p.short_info}</p>
              </div>

              <div className="flex flex-wrap items-start gap-2 mt-2">
                {p?.stacks?.split(",").map((s, i) => {
                  return (
                    <p
                      key={i}
                      className="p-1 text-xs font-semibold bg-gray-900 dark:bg-yellow-500 dark:text-yellow-500 dark:bg-opacity-10 text-white rounded"
                    >
                      {s}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChooseMeProjects;
