import axios from "axios";
import React, { useEffect } from "react";
import { useSimplyContext } from "../context/SimplyContext";
import Image from "next/image";
import sampleProfile from "../public/avatar-2.png";

function ImageUpload() {
  const { CloudinaryImage, setCloudinaryImage, user,currentUser } = useSimplyContext();
  useEffect(() => {
    setCloudinaryImage(currentUser?.profile_img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const uploadImage = (image) => {
    const data = new FormData();
    setCloudinaryImage(image);
    data.append("file", image);
    data.append("upload_preset", "hyt1lmd8");
    axios
      .post("https://api.cloudinary.com/v1_1/dtpdc2bhh/image/upload", data)
      .then((res) => {
        setCloudinaryImage(res.data.url);
        console.log("🎉 Image Uploaded...");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(CloudinaryImage)
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="flex items-center justify-center  mx-2  overflow-hidden rounded-full">
          <Image
            src={
              CloudinaryImage
                ? CloudinaryImage.replace("96", "200")
                : sampleProfile
            }
            alt={currentUser?.username}
            className="rounded-full"
            height={350}
            width={350}
          ></Image>
        </div>

        <div className="absolute flex justify-center items-center bottom-0 right-0 w-10 h-10 mr-3 rounded-full bg-yellow-300 border-2 border-white">
          <label htmlFor="image-upload">
            <i className="fa fa-camera text-yellow-600"></i>
          </label>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={(e) => {
              uploadImage(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
