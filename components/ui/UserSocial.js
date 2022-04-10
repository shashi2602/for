import React from "react";

function UserSocial() {
  return (
    <div className="flex flex-wrap justify-center gap-1 pt-1">
      <a className=" p-2 rounded-full " href="/">
        <i className="fa fa-github h-3 w-3" aria-hidden="true"></i> Github
      </a>
      <a className=" p-2 rounded-full" href="/" >
        <i
          className="fa fa-linkedin-square  text-blue-600 h-3 w-3 "
          aria-hidden="true"
        ></i>{" "}
        Linkedin
      </a>
      <a className=" p-2 rounded-full " href="/">
        <i className="fa fa-google text-red-500 h-3 w-3  " aria-hidden="true"></i>{" "}
        Gmail
      </a>
      <a className=" p-2 rounded-full " href="/">
        <i className="fa fa-dev-to  h-3 w-3  " aria-hidden="true"></i> Dev
      </a>
    </div>
  );
}

export default UserSocial;
