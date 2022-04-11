import React,{useEffect,useState} from "react";
import LayoutPage from "../components/Layout/LayoutPage";
import { useSimplyContext } from "../context/SimplyContext";
import {useRouter} from "next/router";


function DashBoard() {
  const {user,userNamesList,currentUser}=useSimplyContext()
  const [userNameNotFound,setUserNameNotFound]=useState(true)
  const router=useRouter()
  useEffect(() => {
    const find=userNamesList.some(u=>u.uid===user.uid)
    if(find){
      setUserNameNotFound(false)
    }else{
      setUserNameNotFound(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNamesList])
  useEffect(()=>{
    if(!user){
      router.replace("/")
    }
  },[user])
  return (
    <div >
      {
        userNameNotFound?
        <div>
          You have not selected the user name plz signout
        </div>
        :currentUser?<LayoutPage/>:<p>loading</p>
      }
    </div>
  );
}

export default DashBoard;
