/* eslint-disable react/no-unescaped-entities */
import React from "react";

function UserDetails(props) {
  const profile = props.details;
  return (
    <div>
      <h1 align="center" className="text-3xl font-bold text-red-500 p-3">
        Hi 👋, I'm {profile?.username}
      </h1>
      <h3 align="center">A passionate frontend developer from India</h3>
      <div className="flex justify-center gap-5 pt-1 ">
        <p className="font-bold">
          <i className="fa fa-institution text-purple-800 pr-1"></i>ASE
        </p>
        <p className="font-bold">
          <i className="fa fa-map-marker text-sky-700 pr-1"></i>India
        </p>
      </div>
    </div>
  );
}

export default UserDetails;
