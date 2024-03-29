import React from "react";
import { addUser, addUsername } from "../../services/user.services";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, GithubProvider } from "../../firebase";

function GithubBtn(props) {
  const history = useRouter();
  const handleClick = () => {
    try {
      signInWithPopup(auth, GithubProvider).then((result) => {
        const user_details = {
          site_username: props.username,
          username: result.user.displayName,
          profile_img: result.user.photoURL,
          uid: result.user.uid,
          email: result.user.email,
        };
        props.username &&
          addUsername({ site_username: props.username, uid: result.user.uid });
        props.username && addUser(user_details);
        history.push("dashboard");
        toast.success("🙏 welcome back ");
      });
    } catch (err) {
      toast.error("😭 error occurred");
    }
  };
  return (
    <button
      className=" bg-gray-900 hover:text-white  text-white hover:bg-gray-800  p-2 font-semibold inline-flex items-center  transition border-shadow"
      onClick={handleClick}
    >
      <svg
        className="w-4 h-4 fill-current  hover:text-white opacity-75 flex-shrink-0 mx-4"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
      </svg>
      <span className="flex-auto pl-16 pr-8 -ml-16">GitHub</span>
    </button>
  );
}

export default GithubBtn;
