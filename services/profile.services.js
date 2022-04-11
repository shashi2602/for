import {firestoreDB} from "../firebase"
import {collection,addDoc,getDoc,deleteDoc,updateDoc} from "firebase/firestore"

const profileRef=collection(firestoreDB,"profile")

class ProfileService{
    writeProfie=(profile)=>{

    }
}

export default new ProfileService()