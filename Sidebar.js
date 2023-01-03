import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useUserAuth } from "../src/context/UserAuthContext"



const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { logOut } = useUserAuth();

    const UserLogout = async (e) => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.msg)
        }
    }
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/holidays",
            name: "Holidays",
            icon: <FaUserAlt />
        },
        {
            path: "/leave",
            name: "Leave",
            icon: <FaRegChartBar />
        },
        {
            path: "/Timesheet",
            name: "Time sheet",
            icon: <FaShoppingBag/>
        },
      
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">HR</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icons">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }

                <div className="bottom_section">
                    <div className="logout"  onClick={() => UserLogout()}><FaSignOutAlt />Sign Out</div>
                    <div className="out">
                    </div>
                </div>

            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;