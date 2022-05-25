import React from "react";
import toast from "react-hot-toast";
import { useSimplyContext } from "../../context/SimplyContext";
import useFetch from "../../hooks/useFetch";

function GithubProjectsBtn() {
  const { setProjectList, selectedSocial, setChangeDone } = useSimplyContext();
  const username = selectedSocial.find((item) => item.value == "github");
  const { data } = useFetch(
    `https://api.github.com/users/${username?.link}/repos`
  );
  const handleGet = () => {
    if (selectedSocial.length === 0) {
      toast.error("Please add social accounts");
    } else if (!selectedSocial.some((s) => s.value === "github")) {
      toast.error("Please add github username in social");
    } else {
      const filtered_data = data.filter(
        (item) => (item.fork != true) & (item.private != true)
      );
      const projects = filtered_data.map((project) => ({
        id: Math.floor(Math.random() * 100),
        title: project.name,
        short_info: project.description,
        stacks: project.language,
        live_link:
          project.homepage == null ? project.html_url : project.homepage,
        source_code_link: project.html_url,
      }));
      setProjectList((prev) => [...prev, ...projects]);
      setChangeDone(true);
    }
  };
  return (
    <button className=" " onClick={handleGet}>
      <span>
        <i className="fa fa-github" aria-hidden="true"></i> github
      </span>
    </button>
  );
}

export default GithubProjectsBtn;
