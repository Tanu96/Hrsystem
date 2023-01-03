import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../core/config";
import { useNavigate } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [errorMessage,setErrorMessage]=useState(null)

  const navigate = useNavigate();
  
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function getErrorMessage() {
    return errorMessage
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    
    });})
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      if(currentuser){

      // const userClaim= await (currentuser.uid)
      // if(userClaim.data?.customClaims?.role=="admin"){
      //   setUser(currentuser);
      //   return
      // }
      // setErrorMessage("please try to login with admin account")
      // signOut(auth);
      navigate("/login");
    }else{
      navigate("/login");
    }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn,getErrorMessage }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}