import React, { useContext, useState, useEffect } from "react";
import { GoogleProvider, GithubProvider, auth } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getAllUsers, getUserDoc } from "../services/user.services";
import { useAuthState } from "react-firebase-hooks/auth";
import { setCookie, destroyCookie } from "nookies";

const Simply = React.createContext();

function SimplyContext({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userNamesList, setUserNamesList] = useState([]); //TODO: change usernamelist to AllUsers
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [about, setAbout] = useState("");
  const [stackList, setStackList] = useState([]);
  const [changeDone, setChangeDone] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [error, setError] = useState({
    show: false,
    msg: "",
  });
  const [userNameNotFound, setUserNameNotFound] = useState(true);
  const [profileData, setProfileData] = useState();

  //auth state change
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    setCookie(null, "UID", user?.uid);
  }, [user]);

  //Fetching the usernames
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserNamesList(users.docs.map((doc) => ({ ...doc.data() })));
    });
  }, [user]);

  useEffect(() => {
    const found = userNamesList.some((u) => u.uid === user?.uid);
    if (found) {
      setUserNameNotFound(false);
    } else {
      setUserNameNotFound(true);
    }
  }, [userNamesList, user]);

  useEffect(() => {
    if (user) {
      getUserDoc(user?.uid).then((current_user) => {
        setCurrentUser({
          ...current_user.data(),
          docid: current_user.data().uid,
        });
        localStorage.setItem(
          "current_user",
          JSON.stringify({
            ...current_user.data(),
            docid: current_user.data().uid,
          })
        );
      });
    }
  }, [userNamesList, user, changeDone]);

  useEffect(() => {
    setAbout(currentUser?.about_markdown ? currentUser?.about_markdown : "");
    setProjectList(currentUser?.projects ? currentUser.projects : []);
    setStackList(currentUser?.skills ? currentUser.skills : []);
    setSelectedSocial(currentUser?.social ? currentUser.social : []);
    setProfileData({
      username: currentUser?.username ? currentUser.username : "",
      expertise: currentUser?.expertise ? currentUser.expertise : "",
      country: currentUser?.country ? currentUser.country : "",
      status: currentUser?.status ? currentUser.status : "",
      profile_img: currentUser?.profile_img ? currentUser.profile_img : "",
    });
  }, [currentUser]);

  const GoogleSignInWithPopUP = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const GitHubSignInWithPopup = () => {
    return signInWithPopup(auth, GithubProvider);
  };

  const signOut = () => {
    auth.signOut();
    localStorage.removeItem("current_user");
    destroyCookie(null, "UID");
    setCurrentUser("");
    setChangeDone(false);
  };

  return (
    <Simply.Provider
      value={{
        GoogleSignInWithPopUP,
        GitHubSignInWithPopup,
        signOut,
        user,
        currentUser,
        setCurrentUser,
        loading,
        userNamesList,
        setSelectedSocial,
        selectedSocial,
        projectList,
        setProjectList,
        about,
        setAbout,
        setStackList,
        stackList,
        setError,
        error,
        changeDone,
        setChangeDone,
        profileData,
        setProfileData,
        currentTab,
        setCurrentTab,
        userNameNotFound,
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
