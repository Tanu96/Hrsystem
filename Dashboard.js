import React, { useState, useEffect, } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../core/config';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Form, useNavigate } from "react-router-dom";
import "../pages/Dashboard.css";
import { doc, setDoc, } from 'firebase/firestore';
import { auth } from "../core/config";
import { async } from "@firebase/util";
import { getFirestore } from 'firebase/firestore';
import {
    onAuthStateChanged,
} from "firebase/auth";
// import * as admin from "firebase-admin";

function Dashboard() {
    // const [date, setDate] = useState([]);
    const [userAuthDetails, setUserAuthDetails] = useState("");
    const [userDoc, setuserDoc] = useState([]);
    const [presentpopup, setPresentpopup] = useState(false);
    const [absentpopup, setAbsentpopup] = useState(false);
    const [addEmppopup, setAddEmppopup] = useState(false);
    const [user_id, setUser_id] = useState([]);
    const [name, setName] = useState("");
    const [joiningdate, setJoiningDate] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const closeModaldata = () => setAddEmppopup(false);
    const closeModalabsent = () => setAbsentpopup(false);
    const closeModalpresent = () => setPresentpopup(false);
    const navigate = useNavigate();
    const columns = [
        { field: "name", headerName: "Name", flex: 1, },
        { field: "mobile_no", headerName: "Mobile", flex: 1, },
        { field: "joining_date", headerName: "Joining Date", flex: 1, },

        {
            field: "action", headerName: "Action", flex: 1,
            renderCell: (params,) => {
                // console.log(params)
                return (
                    <div>
                        <button className="Presentbtn" onClick={() => Present(params)}>Present</button>
                        <span className="Absentbtn" onClick={() => Absent(params)}>Absent</span>

                        <Popup className="popupdata" open={presentpopup} closeOnDocumentClick >
                            <div className="Delete_popup">
                                <div className="Delete_popup_Title">Present</div>
                                <span className="Delete_popup_text">Are you sure ?</span>
                                <div className="Delete_popup_buttons">
                                    <button className="canclebutton" onClick={closeModalpresent} >No</button>

                                    <button className="Updatebutton" onClick={() => showlist(params)}>Yes</button>
                                </div>

                            </div>
                        </Popup>

                        <Popup open={absentpopup} closeOnDocumentClick >
                            <div className="Delete_popup">
                                <div className="Delete_popup_Title">Absent</div>
                                <span className="Delete_popup_text">Are you sure ?</span>

                                <div className="Delete_popup_buttons">
                                    <button className="canclebutton" onClick={closeModalabsent} >No</button>
                                    <button className="Updatebutton" onClick={() => showlist(params)}>Yes</button>
                                </div>

                            </div>
                        </Popup>
                    </div>
                )
            }
        }
    ]


    useEffect(() => {
        Readuser();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            let temp = currentuser.uid
            // console.log(temp)
            setUserAuthDetails(temp)
        });
    })


    const Readuser = async () => {
        // console.log(userAuthDetails)
        const q = query(collection(db, "Users"));
        let temp = []
        let i = 1
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let obj = doc.data()
            obj.id = i;
            i++;
            temp.push(obj);

        })
        setuserDoc(temp);
    }
    

    const Present = async (params) => {
        setPresentpopup(o => !o)
        let paramssend = params
        showlist(paramssend)
        let attendanceId = params.row.userid

        console.log(params.row)
        let date = new Date();
        let Year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        const Id = (new Date().getTime()).toString();
        console.log(userAuthDetails)
        const attendanceRef = collection(db, `Attendance/${userAuthDetails}/${Year}/${month}/${day}`);
        await setDoc(doc(attendanceRef), {
            name: params.row.name,
            action: "P",
            date: (new Date().getTime()).toString(),
        });
    }


  
    const Absent = async (params) => {
        setAbsentpopup(o => !o)

        let paramssend = params
        showlist(paramssend)
        let attendanceId = params.row.userid

        console.log(params.row)
        let date = new Date();
        let Year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        const Id = (new Date().getTime()).toString();
        const attendanceRef = collection(db, `Attendance/${userAuthDetails}/${Year}/${month}/${day}`);
        await setDoc(doc(attendanceRef), {
            name: params.row.name,
            action: "A",
            date: (new Date().getTime()).toString(),

        });
    }
    const showlist = async (paramssend) => {
        console.log("dashboard")
        navigate(`/usermonthdata/${paramssend.row.userid}`)
    };

    const addData = async () => {
        setAddEmppopup(o => !o)
    }

    const submituser = async (e) => {
        console.log(userAuthDetails)
        let userId = userAuthDetails
        const userRef = collection(db, "Users");

        await setDoc(doc(userRef, userId), {
            userid: userAuthDetails,
            name: name,
            joining_date: joiningdate,
            mobile_no: mobileno,
        }).then(data => { Readuser() });
        setAddEmppopup(false)
    }

    // console.log(name)
    return (
        <div className="dash">
            <div className="tittleemp">
                <div className="heading-title">Employee List</div>
                <button className="Addemp" onClick={() => addData()}>Add Employee Details</button>
                <Popup open={addEmppopup} closeOnDocumentClick >
                    <form>
                        <div className="formdatauser">
                            <div className="Textdata">
                                <label>Name</label>
                                <input type="text" className="inputdashboard"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className="Textdata">
                                <label >Joining Date</label>
                                <input type="text" className="inputdashboard"
                                    onChange={(e) => {
                                        setJoiningDate(e.target.value);
                                    }}></input></div>
                            <div className="Textdata">
                                <label>Mobile No</label>
                                <input type="text" className="inputdashboard"
                                    onChange={(e) => {
                                        setMobileNo(e.target.value);
                                    }}></input>
                            </div>
                        </div>

                    </form>
                    <div className="buttn">
                        <button className="cancleuserdata" onClick={closeModaldata}>Cancle</button>
                        <button className="submituserdata" onClick={(e) => submituser(e)}>Submit</button>
                    </div>
                </Popup>
            </div>
            <Box sx={{ height: 400, width: '100%', padding: '  10px' }}>
                <DataGrid
                    rows={userDoc}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}

                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Box>
        </div>
    )
}


export default Dashboard;
