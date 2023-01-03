import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, doc, setDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from "./core/config";
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator, } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {
  onAuthStateChanged,
} from "firebase/auth";
import "../src/Usermonthdata.css";
import { auth } from "../src/core/config";

function Usermonthdata() {
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState([]);
  const [userAuthDetails, setUserAuthDetails] = useState()



  let { userid } = useParams();
  // console.log({userid})
  useEffect(() => {
    UserDetails()
  }, []);


  const getFormatedDate = (timestamp) => {
    timestamp = Number(timestamp)
    let date = new Date(timestamp);
    let dateString = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    let timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${dateString} ${timeString}`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log(currentuser)
      let dateformat1 = getFormatedDate((currentuser.metadata.lastLoginAt))
      console.log(dateformat1)
      setUserAuthDetails(dateformat1)
    });
  })

  const UserDetails = async () => {

    const UserData = await getDoc(doc(db, `Users/${userid}`));
    console.log("userpage=", UserData.data())
    setUserdata(UserData.data())
  }

  return (

    <div className="userbox">
      <div className="labelname">Employee Attendance</div>

      <Box sx={{ height: 400, width: '100%', padding: '  10px' }}>
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
          disableSelectionOnClick

          columns={[
            { field: 'name', flex: 1 },
            { field: 'joining_date', flex: 1 },
            { field: 'mobile_no', flex: 1 },
            { field: 'date', flex: 1 },
            // { field: 'action', flex: 1 },

          ]}
          rows={[
            { id: 1, name: userdata?.name, date: userAuthDetails, joining_date: userdata?.joining_date, mobile_no: userdata?.mobile_no ,},
          ]}
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
export default Usermonthdata;