/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";
import Image from "next/image";
import sampleProfile from "../../public/avatar-2.png";
import toast from "react-hot-toast";
import axios from "axios";
import InputField from "../forms/InputField";
import Label from "../forms/Label";
import FormGroup from "../forms/FormGroup";
import TextArea from "../forms/TextArea";

function ChooseMeProfile() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const handelChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
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
        setCurrentUser((prev) => ({
          ...prev,
          profile_img: res.data.secure_url,
        }));
      });

    toast.promise(fetch, {
      loading: "😅 uploading",
      error: "😱 error while uploading",
      success: "🥳 upload success",
    });
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 my-[5rem] h-fit">
      <div className="flex flex-col justify-center gap-2 items-center">
        <Image
          src={
            currentUser?.profile_img ? currentUser?.profile_img : sampleProfile
          }
          alt={currentUser?.username}
          className="rounded-full object-cover"
          height={350}
          width={350}
        />
        <div className="mt-2">
          <label
            htmlFor="profile_img"
            className=" px-2 py-2 font-semibold dark:bg-black/40  text-center  cursor-pointer dark:hover:bg-opacity-20 transition duration-300 ease-in-out border-shadow"
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

      <div className="grid gap-2 mt-2">
        <div className="flex gap-3 mt-4">
          <FormGroup>
            <Label text={"👋 Name"} />
            <InputField
              name="username"
              value={currentUser?.username}
              onchange={handelChange}
            />
          </FormGroup>
          <FormGroup>
            <Label text={"💡 Expertise "} />
            <InputField
              name="expertise"
              value={currentUser?.expertise}
              onchange={handelChange}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Label text={"✏️ Bio "} />
          <TextArea
            name="status"
            value={currentUser?.status}
            onchange={handelChange}
            width={"sm:w-[27rem]"}
            height={"h-[10rem]"}
          />
        </FormGroup>

        <FormGroup>
          <Label text={"🌍 From"} />
          <InputField
            name="country"
            value={currentUser?.country}
            onchange={handelChange}
            size={"sm:w-[27rem]"}
          />
        </FormGroup>
      </div>
    </div>

    // <div className="m-2 flex flex-col gap-2 justify-center items-center">
    //   {/* <div className="w-full flex flex-col gap-2 items-center justify-center"> */}
    //     <div>
    //       <Image
    //         src={
    //           currentUser?.profile_img
    //             ? currentUser?.profile_img
    //             : sampleProfile
    //         }
    //         alt={currentUser?.username}
    //         className="rounded-full object-cover"
    //         height={350}
    //         width={350}
    //       />
    //     </div>
    //     <div className="mt-2">
    //       <label
    //         htmlFor="profile_img"
    //         className=" px-2 py-2 font-semibold dark:bg-black/40  text-center  cursor-pointer dark:hover:bg-opacity-20 transition duration-300 ease-in-out border-shadow"
    //       >
    //         📸 Choose Photo
    //       </label>
    //       <input
    //         type="file"
    //         id="profile_img"
    //         className="hidden"
    //         name="profile_img"
    //         onChange={(e) => {
    //           uploadImage(e.target.files[0]);
    //         }}
    //       />
    //     </div>
    //     <div className="flex gap-3 mt-4">
    //       <FormGroup>
    //         <Label text={"👋 Name"} />
    //         <InputField
    //           name="username"
    //           value={currentUser?.username}
    //           onchange={handelChange}
    //         />
    //       </FormGroup>
    //       <FormGroup>
    //         <Label text={"💡 Expertise "} />
    //         <InputField
    //           name="expertise"
    //           value={currentUser?.expertise}
    //           onchange={handelChange}
    //         />
    //       </FormGroup>
    //     </div>
    //       <div className="flex flex-col sm:w-full">
    //         <Label text={"✏️ Bio "} />
    //         <TextArea
    //           name="status"
    //           value={currentUser?.status}
    //           onchange={handelChange}
    //           width={"sm:w-[27rem] "}
    //         />
    //       </div>

    //     <FormGroup>
    //       <Label text={"🌍 From"} />
    //       <InputField
    //         name="country"
    //         value={currentUser?.country}
    //         onchange={handelChange}
    //         size={"w-[27rem]"}
    //       />
    //     </FormGroup>
    //   {/* </div> */}
    // </div>
  );
}

export default ChooseMeProfile;
