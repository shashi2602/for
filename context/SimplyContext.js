import React, { useContext, useState, useEffect } from "react";
import { GoogleProvider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { getAllUsers, getUserDoc } from "../services/user.services";
import { useAuthState } from "react-firebase-hooks/auth";
import { setCookie, destroyCookie } from "nookies";
import toast from "react-hot-toast";
import { SERVER } from "../components/utils/constants";

const Simply = React.createContext();

function SimplyContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    expertise: "",
    country: "",
    status: "",
    status_2: "",
    profile_img: "",
    about_markdown: "",
    site_username: "",
    projects: [],
    skills: [],
    extra_skills: "",
    social: [],
    blog_site: [],
    certifications: [],
    experiences: [],
    seo_settings: {},
    last_visited_tab: "",
    resume: "",
    pinned_blogs: [],
    hidden_modules: [],
  });
  const [userNamesList, setUserNamesList] = useState([]);
  const [changeDone, setChangeDone] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [ispublished, setIsPublished] = useState(false);
  // const [found, setFound] = useState(false); // TODO:need to add this
  //auth state change
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setCookie(null, "UID", user?.uid);
    localStorage.removeItem("is_found");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //Fetching the usernames
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserNamesList(
        users.docs.map((doc) => ({
          site_username: doc.data().site_username,
          uid: doc.data().uid,
        }))
      );
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      try {
        getUserDoc(user?.uid).then((current_user) => {
          setCurrentUser((prev) => ({
            ...prev,
            ...current_user.data(),
          }));
        });
      } catch (err) {
        toast.error("something went wrong");
      }
    }
  }, [user, ispublished]);

  const GoogleSignInWithPopUP = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const signOut = () => {
    auth.signOut();
    destroyCookie(null, "UID");
    setCurrentUser("");
    setChangeDone(false);
    localStorage.removeItem("is_found");
  };
  return (
    <Simply.Provider
      value={{
        GoogleSignInWithPopUP,
        signOut,
        user,
        currentUser,
        setCurrentUser,
        loading,
        userNamesList,
        changeDone,
        setChangeDone,
        // found,
        currentTab,
        setCurrentTab,
        ispublished,
        setIsPublished,
      }}
    >
      {!loading && children}
    </Simply.Provider>
  );
}

export default SimplyContext;

export const useSimplyContext = () => {
  return useContext(Simply);
};
