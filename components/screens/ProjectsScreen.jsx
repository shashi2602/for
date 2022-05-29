/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import GithubProjectsBtn from "../buttons/GithubProjectsButton";
import InputField from "../forms/InputField";
import TextArea from "../forms/TextArea";

function ChooseMeProjects() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const [error, setError] = useState(false);
  const [project, setProject] = useState({
    projectId: "",
    projectTitle: "",
    projectDesc: "",
    projectStacks: "",
    projectSource: "",
    projectLive: "",
  });

  const handleAdd = () => {
    if (project.projectTitle === "") {
      setError(true);
    } else {
      setError(false);
      if (project.projectId) {
        console.log(project.projectId);
        const in_edit = currentUser.projects.find(
          (p) => p.id == project.projectId
        );
        console.log(in_edit);
        if (in_edit) {
          in_edit.title = project.projectTitle;
          in_edit.short_info = project.projectDesc;
          in_edit.stacks = project.projectStacks;
          in_edit.live_link = project.projectLive;
          in_edit.source_code_link = project.projectSource;
        }
      } else {
        const new_proj = {
          id: "project-" + currentUser.projects.length + 1,
          title: project.projectTitle,
          short_info: project.projectDesc,
          stacks: project.projectStacks,
          live_link: project.projectLive,
          source_code_link: project.projectSource,
        };
        setCurrentUser((prev) => ({
          ...prev,
          projects: [...prev.projects, new_proj],
        }));
      }
      setChangeDone(true);
      setProject({
        projectId: "",
        projectTitle: "",
        projectDesc: "",
        projectStacks: "",
        projectSource: "",
        projectLive: "",
      });
    }
  };

  const handleDelete = (id) => {
    setCurrentUser((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id != id),
    }));
    setChangeDone(true);
  };

  const handleEdit = (id) => {
    const edit_project = currentUser.projects.find(
      (project) => project.id === id
    );
    console.log(edit_project);
    setProject({
      projectId: edit_project.id,
      projectTitle: edit_project.title,
      projectDesc: edit_project.short_info,
      projectStacks: edit_project.stacks,
      projectSource: edit_project.live_link,
      projectLive: edit_project.source_code_link,
    });
    setChangeDone(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between m-b-4">
        <h1 className="font-semibold text-lg">🛠️ Projects</h1>
        <div>
          <GithubProjectsBtn />
          <button
            className="ml-4 disabled:cursor-no-drop bg-black/5 dark:bg-[#18181B] dark:text-white font-semibold rounded-md p-2 text-sm"
            onClick={handleAdd}
            disabled={project.projectTitle.length === 0}
          >
            ✔️Add
          </button>
        </div>
      </div>
      <p className="text-red-500 font-semibold">
        {error && "please enter details "}
      </p>
      <div className="grid grid-row p-4">
        <InputField
          placeholder="Project name"
          value={project.projectTitle}
          name="projectTitle"
          onchange={handleChange}
        />

        <TextArea
          placeholder="About project "
          value={project.projectDesc}
          name="projectDesc"
          onchange={handleChange}
        ></TextArea>

        <div className="grid sm:grid-cols-3 sm:gap-2 ">
          <InputField
            placeholder="used to build project ',' separated  "
            value={project.projectStacks}
            onchange={handleChange}
            name="projectStacks"
          />
          <InputField
            placeholder="source link(Github..etc)"
            value={project.projectSource}
            onchange={handleChange}
            name="projectSource"
          />
          <InputField
            placeholder="Does project is live? Then provide link"
            value={project.projectLive}
            name="projectLive"
            onchange={handleChange}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-2  pt-4 mx-4">
        {currentUser?.projects?.map((p, i) => {
          return (
            <div
              className=" flex flex-col justify-between gap-2 w-full sm:w-auto md:w-auto  dark:border-none dark:bg-black/40 bg-gray-100 rounded-md p-4"
              key={i}
            >
              <>
                <div className="flex justify-between flex-nowrap">
                  <Link
                    href={p?.source_code_link === "" ? "" : p?.source_code_link}
                    passHref
                  >
                    <a target={"_blank"}>
                      <i className="fa fa-github text-2xl "></i>
                    </a>
                  </Link>

                  <div className="flex items-center flex-nowrap -space-x-4 hover:space-x-1">
                    <Link
                      href={p?.live_link === "" ? "" : p?.live_link}
                      passHref
                    >
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
                  <p className="font-semibold my-2 capitalize">{p.title}</p>
                  <p className="text-justify">{p.short_info}</p>
                </div>
              </>

              <div className="flex flex-wrap items-start gap-2 mt-2">
                {p?.stacks?.split(",").map((s, i) => {
                  return (
                    <p
                      key={i}
                      className="p-1 text-xs font-semibold bg-gray-900 dark:bg-gray-900/30 dark:text-white dark:bg-opacity-10 text-white rounded"
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
