import React, { useContext, useState, useEffect } from "react";
import { GoogleProvider, GithubProvider, auth } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getAllUsers, getUserDoc } from "../services/user.services";
import { useAuthState } from 'react-firebase-hooks/auth';

const Simply = React.createContext();

function SimplyContext({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userNamesList, setUserNamesList] = useState([]); //TODO: change usernamelist to AllUsers
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [about,setAbout]=useState("")
  const [stackList, setStackList] = useState([]);
  const [changeDone,setChangeDone]=useState(false);
  const [currentTab,setCurrentTab]=useState("");
  const [error, setError] = useState({
    show: false,
    msg: "",
  });
const [profileData,setProfileData]=useState()


 //auth state change 
 const[user, loading]=useAuthState(auth)
  //Fetching the usernames
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserNamesList(
        users.docs.map((doc) => ({
          site_username: doc.data().site_username,
          docid: doc.id,
          uid: doc.data().user_id,
        }))
      );
    });
  }, [user]);


  const handleCurrentUser = () => {
    const cuser = userNamesList.find((u) => u.uid === user?.uid);
    cuser &&
      getUserDoc(cuser.docid).then((current_user) => {
        setCurrentUser({ ...current_user.data(), docid: current_user.id });
        localStorage.setItem(
          "current_user",
          JSON.stringify({ ...current_user.data(), docid: current_user.id })
        );
      });
  };

  useEffect(() => {
    handleCurrentUser()
  }, [userNamesList, user,changeDone]);

  useEffect(()=>{
    setAbout(currentUser?.about_markdown?currentUser?.about_markdown:"");
    setProjectList(currentUser?.projects?currentUser.projects:[]);
    setStackList(currentUser?.skills?currentUser.skills:[]);
    setSelectedSocial(currentUser?.social?currentUser.social:[])
    setProfileData({
      username:currentUser?.username,
      expertise:currentUser?.expertise,
      country:currentUser?.country,
      status:currentUser?.status,
      profile_img:currentUser?.profile_img,
    })
  },[currentUser])


  const GoogleSignInWithPopUP = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const GitHubSignInWithPopup = () => {
    return signInWithPopup(auth, GithubProvider);
  };

  const signOut = () => {
    auth.signOut();
    localStorage.removeItem("current_user");
    setCurrentUser("")
    setChangeDone(false)
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
        setCurrentTab
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
