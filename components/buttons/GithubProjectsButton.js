import React from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import useFetch from "../../hooks/useFetch";

function GithubProjectsBtn() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const username = currentUser?.social.find((item) => item.value == "github");
  const { data } = useFetch(
    `https://api.github.com/users/${username?.link}/repos`
  );
  const handleGet = () => {
    if (currentUser?.social.length === 0) {
      toast.error("Please add social accounts");
    } else if (!currentUser?.social.some((s) => s.value === "github")) {
      toast.error("Please add github username in social");
    } else {
      const filtered_data = data.filter(
        (item) => (item.fork != true) & (item.private != true)
      );
      const github_projects = filtered_data.map((project, i) => ({
        id: "GID" + i,
        title: project.full_name,
        short_info: project.description,
        stacks: project.language,
        favourite: false,
        live_link:
          project.homepage == null ? project.html_url : project.homepage,
        source_code_link: project.html_url,
      }));
      setCurrentUser((prev) => ({
        ...prev,
        projects: [...prev.projects, ...github_projects],
      }));
      setChangeDone(true);
    }
  };
  return (
    <button
      className="font-semibold  px-5 py-3 transition duration-300 ease-in-out border-shadow"
      onClick={() => {
        handleGet();
      }}
    >
      <span>
        <i className="fa fa-github" aria-hidden="true"></i> Github
      </span>
    </button>
  );
}

export default GithubProjectsBtn;
