/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import GithubProjectsBtn from "../buttons/GithubProjectsButton";
import InputField from "../forms/InputField";
import TextArea from "../forms/TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../modals/Modal";
import FormGroup from "../forms/FormGroup";
import Label from "../forms/Label";

function ChooseMeProjects() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  var initialState = {
    id: "",
    title: "",
    short_info: "",
    stacks: "",
    live_link: "",
    source_code_link: "",
    project_thumbnail: "",
  };
  const [project, setProject] = useState(initialState);
  const handleAdd = () => {
    if (project.title === "") {
      setError(true);
    } else {
      setError(false);
      if (project.id) {
        const in_edit = currentUser.projects.find((p) => p.id == project.id);
        console.log("======>updating project id", in_edit);
        if (in_edit) {
          in_edit = Object.assign(in_edit, project);
        }
      } else {
        const updated_projects = [
          ...currentUser.projects,
          {
            ...project,
            id: "MID" + currentUser.projects.length++,
          },
        ];
        setCurrentUser((prev) => ({
          ...prev,
          projects: updated_projects,
        }));
      }
      setChangeDone(true);
      setProject(initialState);
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
    setProject({ ...edit_project });
    setChangeDone(true);
    setShow(!show);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "o9dcboit");
    console.log(data);
    const fetch = axios
      .post("https://api.cloudinary.com/v1_1/dtpdc2bhh/image/upload/", data)
      .then((res) => {
        setProject((prev) => ({
          ...prev,
          project_thumbnail: res.data.secure_url,
        }));
      });
    console.log(fetch);

    toast.promise(fetch, {
      loading: "😅 uploading",
      error: "😱 error while uploading",
      success: "🥳 upload success",
    });
  };
  return (
    <div className="mt-2">
      <div>
        <p className="p-3 text-center font-semibold">
          click on create project to add project or to get projects from github
          click on github button.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <GithubProjectsBtn />
          <button
            className=" font-semibold px-5 py-3 transition duration-300 ease-in-out border-shadow "
            onClick={() => {
              setProject(initialState);
              setShow(!show);
            }}
          >
            Create Project{" "}
            <i className="fa fa-plus text-sm" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <Modal
        show={show}
        handleAdd={handleAdd}
        showAdd={true}
        heading={"🛠️ Add Project"}
        disableSave={project.title === ""}
      >
        <FormGroup>
          <Label text={"Project Title"} />
          <InputField
            placeholder="Project Title"
            value={project.title}
            name="title"
            onchange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label text={"Description"} />
          <TextArea
            placeholder="A short description about your project."
            value={project.short_info}
            name="short_info"
            onchange={handleChange}
          ></TextArea>
        </FormGroup>
        <FormGroup>
          <Label text={"Stack"} />
          <InputField
            placeholder="Ex:React js,Mongodb etc "
            value={project.stacks}
            onchange={handleChange}
            name="stacks"
          />
        </FormGroup>
        <FormGroup>
          <Label text={"Project URL"} />
          <InputField
            placeholder="https://projectsite.com"
            value={project.live_link}
            onchange={handleChange}
            name="live_link"
          />
        </FormGroup>
        <FormGroup>
          <Label text={"Git URL"} />
          <InputField
            placeholder="https://www.github/myproject"
            value={project.source_code_link}
            name="source_code_link"
            onchange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label
            htmlFor="profile_img"
            className=" px-2 py-2 font-semibold dark:bg-black/40  text-center  cursor-pointer dark:hover:bg-opacity-20 transition duration-300 ease-in-out border-2 border-black dark:border-0 rounded-md"
          >
            📸 Add Image
          </label>
          <input
            type="file"
            id="profile_img"
            className="hidden"
            name="profile_img"
            onChange={(e) => {
              uploadImage(e.target.files[0]);
            }}
          />
        </FormGroup>
      </Modal>
      <div className="pt-4 mx-4 grid sm:grid-cols-3 grid-cols-1 gap-2">
        {currentUser?.projects.map((p, i) => {
          return (
            <ProjectCard
              key={i}
              title={p?.title}
              description={p?.short_info}
              stack={p?.stacks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              gitlink={p?.source_code_link === "" ? "" : p?.source_code_link}
              link={
                p?.live_link === ""
                  ? p?.source_code_link === ""
                    ? ""
                    : p?.source_code_link
                  : p?.live_link
              }
              id={p?.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChooseMeProjects;

const ProjectCard = ({
  title,
  description,
  stack,
  handleDelete,
  handleEdit,
  link,
  gitlink,
  id,
}) => {
  return (
    <div className="border-2 border-black rounded-md   dark:border-[#18181B] dark:bg-transparent ">
      <div className="flex flex-col  justify-between h-full w-full overflow-hidden">
        <div className="grid grid-flow-col">
          {/* <div
          className="overflow-hidden bg-center bg-no-repeat bg-cover w-[10rem] h-full rounded-t-md"
          style={{
            backgroundImage: "url(https://www.hyperui.dev/photos/beach-1.jpeg)",
          }}
        ></div> */}
          <Link href={link}>
            <>
              <div className="p-4">
                <div className="flex justify-between py-2">
                  <h1 className="text-lg font-bold capitalize">{title}</h1>
                  <div className="flex gap-2">
                    {stack?.split(",").map((s, i) => {
                      return (
                        <p key={i} className="text-lg">
                          <i
                            className={`devicon-${s.toLowerCase()}-plain `}
                          ></i>
                        </p>
                      );
                    })}
                  </div>
                </div>

                <p>{description}</p>
              </div>
            </>
          </Link>
        </div>
        <div className="border-t-2 border-black dark:border-[#18181B] flex justify-between flex-nowrap rounded-b p-2 bg-black/95 text-white ">
          <Link href={gitlink} passHref>
            <a target={"_blank"}>
              <i className="fa fa-github text-2xl "></i>
            </a>
          </Link>
          <div className="flex items-center flex-nowrap">
            <button
              className="  transition-all   rounded-full "
              type="button"
              onClick={() => {
                handleEdit(id);
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
              className="p-2  transition-all  rounded-full"
              type="button"
              onClick={() => {
                handleDelete(id);
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
      </div>
    </div>
  );
};
