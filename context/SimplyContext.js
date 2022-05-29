import React, { useContext, useState, useEffect } from "react";
import { GoogleProvider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { getAllUsers, getUserDoc } from "../services/user.services";
import { useAuthState } from "react-firebase-hooks/auth";
import { setCookie, destroyCookie } from "nookies";
import toast from "react-hot-toast";

const Simply = React.createContext();

function SimplyContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    expertise: "",
    country: "",
    status: "",
    profile_img: "",
    about_markdown: "",
    site_username: "",
    projects: [],
    skills: [],
    social: [],
    blog_site: "",
    certifications: [],
    experiences: [],
    seo_settings: {},
    last_visited_tab: "",
  });
  const [userNamesList, setUserNamesList] = useState([]);
  const [changeDone, setChangeDone] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [ispublished, setIsPublished] = useState(false);
  const [found, setFound] = useState(false); // TODO:need to add this
  //auth state change
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setCookie(null, "UID", user?.uid);
  }, [user]);

  //Fetching the usernames
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserNamesList(users.docs.map((doc) => ({ ...doc.data() })));
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
