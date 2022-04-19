import { getAllUsers } from "../../services/user.services";


export const getUserNames=()=>{

    let allUsers;
    getAllUsers().then((users) => {
         allUsers= users.docs.map((doc) => ({
            site_username: doc.data().site_username,
            docid: doc.id,
            uid: doc.data().user_id,
          }))
      });
      console.log("util files",allUsers)
    return allUsers
}