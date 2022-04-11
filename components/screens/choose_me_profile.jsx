import { useEffect, useState } from "react";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";
import Image from "next/image";
import sampleProfile from "../../public/avatar-2.png";
import toast,{Toaster} from "react-hot-toast";
import axios from "axios";

function ChooseMeProfile() {
  const { error, setError, currentUser,setChangeDone} = useSimplyContext();
  const [username, setUserName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser?.username);
      setExpertise(currentUser?.expertise);
      setCountry(currentUser?.country);
      setStatus(currentUser?.status);
      setProfileImage(currentUser?.profile_img);
    }
  }, [currentUser]);

  console.log({
          username: username,
          expertise: expertise,
          country: country,
          status: status,
        })
  // const handleSubmit = () => {
  //   if (
  //     (username != "") &
  //     (expertise != "") &
  //     (country != "") &
  //     (status != "")
  //   ) {
  //     const profile = {
  //       username: username,
  //       expertise: expertise,
  //       country: country,
  //       status: status,
  //     };
  //     try {
  //       updateUserDoc(currentUser.docid, profile);
  //       setChangeDone("change done profile")
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setError({
  //       show: false,
  //     });
  //   } else {
  //     setError({
  //       show: true,
  //       msg: "must fill all the fields",
  //     });
  //   }
  // };

  const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hyt1lmd8");
    const fetch=axios
      .post("https://api.cloudinary.com/v1_1/dtpdc2bhh/image/upload", data)
      .then((res) => {
        setProfileImage(res.data.url);
        try {
          updateUserDoc(currentUser.docid, { profile_img: res.data.url });
          
        } catch (err) {
          console.log(err);
        }
        console.log("🎉 Image Uploaded at ", res.data.url);
        setChangeDone("change in profile image")
      })
      .catch((err) => {
        console.log(err);
      });
      toast.promise(fetch,{
        'loading':'😅 uploading',
        'error':"😱 error while uploading",
        'success':"🥳 upload success"
      })
  };
 
  return (
    <div className="m-2 w-full">
      <Toaster position="top-right"/>
      <div className="flex justify-center pt-3">
        <div className="grid grid-rows gap-3 justify-items-center">
          <div>
            <Image
              src={profileImage ? profileImage : sampleProfile}
              alt={currentUser?.username}
              className="rounded-full object-cover"
              height={350}
              width={350}
            ></Image>
          </div>
          <label
            htmlFor="image-upload"
            className="border-black border-2 px-2 py-1 rounded font-semibold text-center bg-black text-white cursor-pointer hover:bg-yellow-300 hover:text-black transition duration-300 ease-in-out"
          >
            📸 Choose Photo
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

      <div className="flex justify-center gap-2 mt-4 ">
        <InputField
          name="username"
          value={username}
          onchange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <InputField
          name="Status "
          value={status}
          onchange={(e) => {
            setStatus(e.target.value);
          }}
        />
        <InputField
          name="Expertise"
          value={expertise}
          onchange={(e) => {
            setExpertise(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center pt-1">
        <InputField
          name="Country"
          value={country}
          onchange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>
      {error.show ? <p>{error.msg}</p> : <></>}
    </div>
  );
}

function InputField(props) {
  return (
    <input
      id={props.name}
      type="text"
      className=" bg-gray-200 rounded border-2 border-black h-15 py-2 px-3  mb-3"
      placeholder={props.name}
      value={props.value}
      required
      onChange={props.onchange}
    />
  );
}

export default ChooseMeProfile;
