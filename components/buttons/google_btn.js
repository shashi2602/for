import React from 'react';
import { useSimplyContext } from '../../context/SimplyContext';
import { WriteUser } from '../../services/user.services';
import {useRouter} from "next/router";

function GoogleBtn(props) {
    const{GoogleSignInWithPopUP,setError}=useSimplyContext()
    const history=useRouter()
    const handleClick=()=>{

      try{
        GoogleSignInWithPopUP().then(result=>{
          const user_details={
            site_username:props.username,
            username:result.user.displayName,
            profile_img:result.user.photoURL,
            user_id:result.user.uid,
            email:result.user.email
          }
          props.username&&WriteUser(user_details)
          history.push('dashboard')
        })
        setError({show:false,msg:""})
        
      }catch(err){
        console.log("error in google login")
        setError({show:true,msg:err})
      }
    }
    return (
        <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center p-2 rounded-sm" onClick={handleClick}>
            <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
            </svg>
            <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
          </button>
        </div>
      </div>
    )
}

export default GoogleBtn
