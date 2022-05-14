/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";
import Image from "next/image";
import sampleProfile from "../../public/avatar-2.png";
import toast from "react-hot-toast";
import axios from "axios";

function ChooseMeProfile() {
  const { currentUser, profileData, setProfileData, setChangeDone } =
    useSimplyContext();
  const handelChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setChangeDone(true);
  };

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hyt1lmd8");

    const fetch = axios
      .post("https://api.cloudinary.com/v1_1/dtpdc2bhh/image/upload", data)
      .then((res) => {
        setProfileData((prev) => ({
          ...prev,
          profile_img: res.data.secure_url,
        }));
        updateUserDoc(currentUser.docid, { profile_img: res.data.secure_url });
      });

    toast.promise(fetch, {
      loading: "😅 uploading",
      error: "😱 error while uploading",
      success: "🥳 upload success",
    });
  };

  return (
    <div className="m-2 w-full ">
      <div className="flex justify-center pt-3">
        <div className="grid grid-rows gap-3 justify-items-center">
          <div>
            <Image
              src={
                profileData?.profile_img
                  ? profileData?.profile_img
                  : sampleProfile
              }
              alt={currentUser?.username}
              className="rounded-full object-cover"
              height={350}
              width={350}
            />
          </div>
          <label
            htmlFor="profile_img"
            className=" px-2 py-1 border-2  border-black dark:border-white  rounded-md shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] hover:shadow-none font-semibold text-center  cursor-pointer hover:bg-yellow-300 hover:text-black transition duration-300 ease-in-out"
          >
            📸 Choose Photo
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
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 ">
        <InputField
          name="username"
          value={profileData?.username}
          onchange={handelChange}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <InputField
          name="status"
          value={profileData?.status}
          onchange={handelChange}
        />
        <InputField
          name="expertise"
          value={profileData?.expertise}
          onchange={handelChange}
        />
      </div>
      <div className="flex justify-center pt-1">
        <InputField
          name="country"
          value={profileData?.country}
          onchange={handelChange}
        />
      </div>
    </div>
  );
}

function InputField(props) {
  return (
    <input
      id={props.name}
      type="text"
      className=" bg-gray-200 dark:bg-[#18181B] rounded border-2 border-black dark:border-none h-15 py-2 px-3  mb-3"
      placeholder={props.name}
      value={props.value}
      name={props.name}
      required
      onChange={props.onchange}
    />
  );
}

export default ChooseMeProfile;
