import { useEffect, useRef, useState } from 'react'
// import { DateRangePicker } from 'react-date-range'
import Box from '@mui/material/Box';
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import "../pages/Leave.css"
import { TextField, Button } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { db } from "../core/config";
import { doc , getDoc } from 'firebase/firestore';
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../core/config";

const DateRangePickerComp = () => {
  const getInitialState = () => {
    const value = "Sick Leave";
    return value;
  };
  const [userDoc, setuserDoc] = useState([]);
const[userId , setUserId]=useState();
const [username, setUsername] = useState([]);
  const [open, setOpen] = useState(false);
  const [userapi, setUserapi] = useState([]);
  const refOne = useRef(null);
  const [value, setValue] = useState(getInitialState);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [date, setDate] = useState({
   
  });
  const tempData = event => {
    setDate(event);
    console.log(event)
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
    setUserId(currentuser.uid)
    });})

    useEffect(() => {
      UserDetails();
    })

    const UserDetails = async () => {
      // console.log(userId)
      const UserData = await getDoc(doc(db, `Users/${userId}`));
      // console.log("userpage=", UserData.data())
      let userRef = (UserData.data())?.name
      setUsername(userRef)
    }

    

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  const fetchData = async() => {
    const request ={
      method: 'POST',
      body:JSON.stringify({
      "date": date,
      "Reason": `Please approve my ${value}`,
      "username":username, } )
      }
    return await fetch("http://127.0.0.1:5001/fantasyexpert-a75b2/us-east1/cloud/Testing",request)
          .then((response) => response.json())
          .then((data) => setUserapi(data));
  }

  useEffect(() => {
    fetchData();
  },[])


  return (
    <div className='leavebox'>
      <h2>Employee Leave</h2>

      
    <div className="calendarWrap">
        <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '15ch' },
      }}
      noValidate
      autoComplete="off"></Box>
    
    <div>
      <select value={value} onChange={handleChange}>
        <option value="Sick">Sick Leave</option>
        <option value="Vacation">Vacation</option>
        <option value="Unpaid">Unpaid Leave</option>
        <option value="paid">paid Leave</option>
      </select>
      <p>{`You selected ${value}`}</p>
    </div>

           <div className='Leaveform'> 
           <label className='labeltxt'>Leave from</label>
           <DateRangePicker  placeholder="Select Date"  style={{ width: 230 , display:'flex'}} 
          
           onChange={tempData}
        />
      
          
           <div className='submitreq'>
           <label className='labeltxt'>Submit Request to</label>
            <TextField className='textname'></TextField>
          {/* <div className='leavedetail'>
          <label className='labeltxt'>Note</label>
          <TextField className='textname'></TextField>
      </div> */}
      </div>
      </div>
      
      <div className='Submitbtnleave'>
      <Button variant="contained" color="success" onClick= {() => fetchData()} >Submit</Button>
    </div>
    

      </div>

   

    </div>
  )
}

export default DateRangePickerComp

// import React from "react";
// import { DateRangePicker } from "mui-daterange-picker";


// function Leave() {
//   const [open, setOpen] = React.useState(true);
//   const [dateRange, setDateRange] = React.useState({});

//   const toggle = () => setOpen(!open);
//   console.log("startdate = ", dateRange.startDate);
//   console.log("enddate = ", dateRange.endDate)


// //   var d = '12/12/1955 12:00:00 AM';
// // d = d.split(' ')[0];
// // console.log(d);
//   return (
//   <div>
//     <button onClick={toggle}>Select Date</button>
//     <DateRangePicker
//     startDate={dateRange.startDate} 
//       open={open}
//       toggle={toggle}
//        onChange={(range) => setDateRange(range)}
//     />
//     <div>
//         <lable>start Date</lable>
//     <input  value={dateRange.startDate} readOnly></input>
//     <lable>end Date</lable>
//     <input value={dateRange.endDate} readOnly></input>

//     </div>
    
 
//     </div>
//   );
// }
// export default Leave;




// import * as React from 'react';

// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// export default function BasicDateRangePicker() {
//   const [value, setValue] = React.useState([null, null]);

//   return (
//     <LocalizationProvider
//       dateAdapter={AdapterDayjs}
//       localeText={{ start: 'Check-in', end: 'Check-out' }}
//     >
//       <DateRangePicker
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//         )}
//       />
//     </LocalizationProvider>
//   );
// }
