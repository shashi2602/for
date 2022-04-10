import {firestoreDB} from "../firebase"
import {collection,addDoc,getDoc, getDocs, doc,updateDoc} from "firebase/firestore"

const userRef=collection(firestoreDB,"users")

const aboutRef=collection(firestoreDB,"about")
const socialRef=collection(firestoreDB,"social")
const skillsRef=collection(firestoreDB,"skills")
const projectsRef=collection(firestoreDB,"projects")
const mywishRef=collection(firestoreDB,"mywish")

function WriteUser(user){
   return addDoc(userRef,user).then(d=>{
        console.log("added record")
    }).catch(err=>{
        console.log(err)
    })
}

function getAllUsers(){
 return getDocs(userRef)
}

function getUserDoc(id){
    const userDoc=doc(firestoreDB,"users",id)
    return getDoc(userDoc)
}
function updateUserDoc(id,data){
    const userDoc=doc(firestoreDB,"users",id)
    return updateDoc(userDoc,data)
}
export {
    WriteUser,
    userRef,
    getAllUsers,
    getUserDoc,
    updateUserDoc
}