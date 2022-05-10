/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { firstLetterUpper } from "../utiles/textutils";
import UserImage from "./UserImage";

function UserDetails(props) {
  const profile = props.details;
  return (
    <div>
      <div>
        <h1 align="center" className="text-3xl font-bold p-3">
          {firstLetterUpper(profile?.username)}
        </h1>
        <h3 align="center">{profile?.status}</h3>
        <div className="flex justify-center gap-5 pt-1 ">
          <p className="font-bold">
            <i className="fa fa-institution text-purple-800 pr-1"></i>
            {profile?.expertise}
          </p>
          <p className="font-bold">
            <i className="fa fa-map-marker text-sky-700 pr-1"></i>
            {profile?.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
