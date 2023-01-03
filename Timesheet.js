
import Header from "./components/Header";
import Calendar from "./components/Calender";
import CalendarState from "./components/CalenderContext";
import TaskForm from "./components/TaskForm";
import '../pages/Timesheet.css';

function App() {
  
  return (
    <div className="timesheetpage"> 
    <div className="containerSheet">
      <CalendarState>
        <Header />
        <Calendar />
        <TaskForm/>
      </CalendarState>
      {/* <a href="https://github.com/sergiss/task-calendar" target="_blank"><i className="fa">&#xf09b;</i> Source Code </a> */}
    </div>
    </div>
  );
}

export default App;