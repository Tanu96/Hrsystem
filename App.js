// import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "../src/pages/Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import Sidebar from "./Sidebar";
import Leave from "../src/pages/Leave";
import Holidays from "../src/pages/Holidays";
import Timesheet from "../src/pages/Timesheet";
// import Dashboard from "./Dashboard";
import ProtectedRoute from "../src/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Usermonthdata from "./Usermonthdata";
import Signout from "./Signout";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./core/config";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      setUser(currentuser)
    });
  })

  const publicRoute = () => {
    return (
      <UserAuthContextProvider>
        <Routes>
          <Route
            path=""
            element={<Login />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    );
  };

  const privateRoute = () => {
    return (

      <UserAuthContextProvider>

        <div style={{ display: "flex" }}>
          <div>
            <Sidebar></Sidebar>
          </div >
          <Routes>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/leave" element={<Leave />} />

            <Route
              path="/holidays"
              element={
                <ProtectedRoute>
                  <Holidays />
                </ProtectedRoute>
              } />


            <Route
              path="/usermonthdata/:userid"
              element={
                <ProtectedRoute>
                  <Usermonthdata />
                </ProtectedRoute>
              } />

            <Route
              path="/timesheet"
              element={
                <ProtectedRoute>
                  <Timesheet />
                </ProtectedRoute>
              } />

            <Route
              path="/signout"
              element={
                <ProtectedRoute>
                  <Signout />
                </ProtectedRoute>
              } />
          </Routes>



        </div>
      </UserAuthContextProvider>

    );
  }

  return user ? privateRoute() : publicRoute();

}

export default App;


// import * as admin from "firebase-admin";
// import * as gplay from "google-play-scraper";

// export async function googlePlayScraper(req: any, res: any) {
//   if (req.query.appId === "") {
//     res.send({ success: false, message: `'appId' cannot be empty.` });
//     return;
//   }
//   if (!req.query.appId) {
//     res.send({ success: false, message: `'appId' is mandatory.` });
//     return;
//   }
//   if (req.query.count === "") {
//     res.send({ success: false, message: `'count' cannot be empty.` });
//     return;
//   }
// const docRef = admin
//         .firestore()
//         .collection("assets")
//         .doc(req.query.appId);

//       reviews.data.forEach((review: any) => {
//         docRef
//           .collection("rawData")
//           .doc(review.id)
//           .set(review, { merge: true })
//           .then()
//           .catch((err: any) => {
//             console.log(
//               "Error while saving the reviews to Firebase => " + err.message
//             );
//             res.send({
//               success: false,