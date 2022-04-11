import React, { useContext, useState, useEffect } from "react";
import { GoogleProvider, GithubProvider, auth } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getAllUsers, getUserDoc } from "../services/user.services";
import { useAuthState } from 'react-firebase-hooks/auth';

const Simply = React.createContext();

function SimplyContext({ children }) {
  // const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  // const [loading, setLoading] = useState(true);
  const [userNamesList, setUserNamesList] = useState([]); //TODO: change usernamelist to AllUsers
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [selectTechStack, setSelectTechStack] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [about,setAbout]=useState("")
  const [stackList, setStackList] = useState([]);
  const [changeDone,setChangeDone]=useState("");
  const [save,setSave]=useState();
  const [error, setError] = useState({
    show: false,
    msg: "",
  });

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
  }, []);

  // ! Need to remove 
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setLoading(false);
  //     setUser(user);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNamesList, user,changeDone]);

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
        selectTechStack,
        setSelectTechStack,
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
        save,
        setSave
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
