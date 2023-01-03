
import React, { useState, useEffect, } from "react";
import { getDocs, collection, getDoc, doc, setDoc, } from 'firebase/firestore';
import { onAuthStateChanged} from "firebase/auth";
import { auth, db} from "../src/core/config";
import { useUserAuth } from  "../src/context/UserAuthContext"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Signout = () => {
  const { logOut } = useUserAuth();
  // const popupState = popupState({ variant: 'popover', popupId: 'demoMenu' })

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
  //     if(currentuser){
  //     Getuser(currentuser.uid)
      
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);


  // const Getuser = async (userid) => {
  //   const Userdata = await getDoc(doc(db, `Users/${userid}`));
  //   let Userinformation = Userdata.data()
  //   setUsername(Userinformation?.full_name)
  //   let fullname = Userinformation?.full_name

  //   // const Split_fullname = fullname?.split(' ');
  //   // const convert_fullname = Split_fullname?.shift().charAt(0) + Split_fullname?.pop().charAt(0);
    
  //   // setShortname(convert_fullname)
  // }

const UserLogout = async (e) => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.msg)
    }
  }

return ( 

<div>

          <div className="p-4 box mt-3 text-center">
         {/* <Link to="/login">Sign out</Link> */}
         <Button onClick={() => UserLogout()}>logOut</Button>
        </div>
        </div>
        
)
}

export default Signout;