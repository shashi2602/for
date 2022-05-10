import Image from "next/image";
import React from "react";
import sampleimg from "../../public/avatar-male.png";

function UserImage(props) {
  const profile = props.details;
  return (
    <div className="flex justify-center pt-3">
      <Image
        alt={profile?.username}
        className="rounded-full sm:w-72 sm:h-72 h-60 w-60  object-cover  "
        height={300}
        width={300}
        src={profile?.profile_img ? profile?.profile_img : sampleimg}
      />
    </div>
  );
}

export default UserImage;
