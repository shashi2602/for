/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";


function ChooseMeProjects() {
  const { projectList, setProjectList, currentUser ,setChangeDone} = useSimplyContext();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectStacks, setProjectStacks] = useState("");
  const [projectSource, setProjectSource] = useState("");
  const [projectLive, setProjectLive] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleAdd = () => {
    if (projectId) {
        const in_edit=projectList.find(project=>project.id===projectId)
        if(in_edit){
            in_edit["title"]= projectTitle
            in_edit["short_info"]= projectDesc
            in_edit["stacks"]= projectStacks
            in_edit["live_link"]= projectLive
            in_edit["source_code_link"]= projectSource
        }
    } else {
      const new_proj = {
        id: "project-" + (projectList.length + 1),
        title: projectTitle,
        short_info: projectDesc,
        stacks: projectStacks,
        live_link: projectLive,
        source_code_link: projectSource,
      };
      setProjectList((prev) => [...prev, new_proj]);
    }
    setProjectTitle("");
    setProjectDesc("");
    setProjectStacks("");
    setProjectSource("");
    setProjectLive("");
    setProjectId("");
  };
  const handleDelete = (id) => {
    setProjectList(projectList.filter((p) => p.id != id));
  };
  const handleSave = () => {
    try {
      // console.log(projectList)
      updateUserDoc(currentUser.docid, { projects: projectList });
      setChangeDone("change in projects")
    } catch (err) {
      console.log();
    }
  };
  const handleEdit = (id) => {
    const edit_project = projectList.find((project) => project.id === id);
    setProjectId(edit_project.id);
    setProjectTitle(edit_project.title);
    setProjectDesc(edit_project.short_info);
    setProjectStacks(edit_project.stacks);
    setProjectSource(edit_project.live_link);
    setProjectLive(edit_project.source_code_link);
  };
  useEffect(()=>{
      console.log(projectList)
  },[projectList])
  useEffect(() => {
    setProjectList(currentUser.projects?currentUser.projects:[]);
  }, []);
  return (
    <div className="w-full  m-2 p-2">
      <div className="grid grid-row">
        <input
          id="project title"
          type="text"
          className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3 w-full sm:w-auto mb-3"
          placeholder="Project name"
          value={projectTitle}
          onChange={(e) => {
            setProjectTitle(e.target.value);
          }}
          required
        />
        <textarea
          id="project title"
          className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3  mb-3 w-full"
          placeholder="About project in short"
          value={projectDesc}
          onChange={(e) => {
            setProjectDesc(e.target.value);
          }}
        ></textarea>
        <div className="grid sm:grid-cols-3 sm:gap-2 ">
          <input
            type="text"
            className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3  mb-3 w-full  "
            placeholder="used to build project ',' separated  "
            value={projectStacks}
            onChange={(e) => {
              setProjectStacks(e.target.value);
            }}
          />
          <input
            type="text"
            className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3  mb-3 w-full "
            placeholder="source link(Github..etc)"
            value={projectSource}
            onChange={(e) => {
              setProjectSource(e.target.value);
            }}
          />
          <input
            type="text"
            className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3  mb-3 w-full "
            placeholder="Does project is live? Then provide link"
            value={projectLive}
            onChange={(e) => {
              setProjectLive(e.target.value);
            }}
          />
        </div>
        <button
          className="border-solid border-black border-2 font-bold py-1 px-2 rounded hover:bg-yellow-300 border-b-4 transition duration-300 ease-in-out"
          onClick={handleAdd}
        >
          ✔️Add
        </button>
      </div>
      <div className="flex flex-wrap xl:flex-none gap-3 justify-center pt-4 mx-4">
        {projectList?.map((p, i) => {
          return (
            <div
              className=" w-80  border-2 border-black rounded p-4"
              key={p.id}
            >
              <div className="flex justify-between">
                <i className="fa fa-folder-o text-2xl"></i>
                <div className="flex gap-2 pt-2">
                  <i
                    className="fa fa-pencil"
                    onClick={() => {
                      handleEdit(p.id);
                    }}
                  ></i>
                  <i
                    className="fa fa-trash text-red-500"
                    onClick={() => {
                      handleDelete(p.id);
                    }}
                  ></i>
                  <i className="fa fa-external-link "></i>
                </div>
              </div>
              <p className="font-semibold my-2">{p.title}</p>
              <p>{p.short_info}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.stacks.split(",").map((s, i) => {
                  return (
                    <p
                      key={i}
                      className="p-1 text-sm bg-black text-white rounded"
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
      <button onClick={handleSave}>submit</button>
    </div>
  );
}

export default ChooseMeProjects;
