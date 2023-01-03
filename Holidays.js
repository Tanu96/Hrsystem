import * as React from 'react';
import "../pages/Holiday.css";
import rep from '../images/republicday.jpg';
import Inde from '../images/independenceday.jpg';
import holi from '../images/Holi.jpg';
import Mah from '../images/maharastraday.jpg';
import bak from '../images/barkraeid.jpg';
import gan from '../images/ganpati.jpg';
import gandhi from '../images/Gandhiji.jpg';
import dus from '../images/dussehra.jpg';
import diwali from '../images/diwali.jpg';
import christmas from '../images/christmas.jpg';

const Holidays = () => {

  return (
    <div>
      <div className='tittleholiday'>
      <h2>Holidays List 2023</h2>
      </div>
    <div className='cardbox'>
      <div className="card">
        <div className="imgbox">
          <img src={rep} alt="logo" />
        </div>

        <div className="content">
          <label>26 Jan</label>
          <p>Republic Day </p>
        </div>
      </div>

      <div className="card">
        <div className="imgbox">
          <img src={holi} alt="logo" />
        </div>

        <div className="content">
          <label>8 Mar</label>
          <p>Holi</p>
        </div>
      </div>

      <div className="card">
        <div className="imgbox">
          <img src={Mah} alt="logo" />
        </div>

        <div className="content">
          <label>1 May</label>
          <p>Maharashtra Day</p>
        </div>
      </div>

      <div className="card">
        <div className="imgbox">
          <img src={bak} alt="logo" />
        </div>

        <div className="content">
          <label>29 June</label>
          <p>Bakar-Eid</p>
        </div>
      </div>

      <div className="card">
        <div className="imgbox">
          <img src={Inde} alt="logo" />
        </div>

        <div className="content">
          <label>15 August</label>
          <p>Independence Day</p>
        </div>
      </div>

</div>

<div className='carddir'> 
      <div className="card">
        <div className="imgbox">
          <img src={gan} alt="logo" />
        <div className="content">
          <label>19 Sep</label>
          <p>Ganesh Chaturthi</p>
        </div>
        </div>

      </div>

      <div className="card">
        <div className="imgbox">
          <img src={gandhi} alt="logo" />
        <div className="content">
          <label>02 Oct</label>
          <p>Gandhi Jayanti</p>
        </div>
        </div>

      </div>

      <div className="card">
        <div className="imgbox">
          <img src={dus} alt="logo" />
        </div>

        <div className="content">
          <label>24 Oct</label>
          <p>Dussehra</p>
        </div>
      </div>

      <div className="card">
        <div className="imgbox">
          <img src={diwali} alt="logo" />
        </div>

        <div className="content">
          <label>13 Nov</label>
          <p>Diwali</p>
        </div>
      </div>


      <div className="card">
        <div className="imgbox">
          <img src={christmas} alt="logo" />
        </div>

        <div className="content">
          <label>25 Dec</label>
          <p>christmas</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Holidays;
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'Name',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'date',
//     headerName: 'Date',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, firstName: 'Jon', date: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataGridDemo() {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         disableSelectionOnClick
//         experimentalFeatures={{ newEditingApi: true }}
//       />
//     </Box>
//   );
// }
