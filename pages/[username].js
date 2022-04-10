import React, { useState ,useEffect} from "react";
import DarkMode from "../components/ui/DarkMode";
import Footer from "../components/ui/Footer";
import UserAboutMarkdown from "../components/ui/UserAboutMarkdown";
import UserDetails from "../components/ui/UserDetails";
import UserImage from "../components/ui/UserImage";
import UserSocial from "../components/ui/UserSocial";
import UserStack from "../components/ui/UserStack";
import {useRouter} from "next/router"
import { useSimplyContext } from "../context/SimplyContext";
import { getUserDoc } from "../services/user.services";

function User(props) {
  const router=useRouter();
  const username=router.query.username
  const {currentuser,userNamesList}=useSimplyContext();
  const [userData,setUserData]=useState();
  const [userFound,setUserFound]=useState(true);
  console.log(props.posts)
  const getdata=()=>{
    const userdoc=userNamesList.find(user=>user.site_username===username)
    if(userdoc){
      setUserFound(true)
      getUserDoc(userdoc.docid).then(userdata=>{
        console.log(userdata.data())
        setUserData(userdata.data())
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  useEffect(() => {
    const unsubscribe=getdata()
    return () => {
      unsubscribe
    }
  }, [userNamesList])
  
  return (
    <>
    {userFound&&userData?
    <>
      <DarkMode/>
      <div className=" sm:px-7 lg:px-72 md:7 2xl:7 px-7">
        <UserImage image={userData} />
        <UserDetails details={userData}/>
        <UserSocial />
        <UserAboutMarkdown />
        <UserStack/>
      </div>
      <Footer/>
      </>
    :<div>NO USER FOUND,PLEASE CREATE ONE</div>}
    </>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
export default User;
