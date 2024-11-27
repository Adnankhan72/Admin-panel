import React from "react";
import { ReactComponent as Sun } from "../images/Sun.svg";
import { ReactComponent as Moon } from "../images/Moon.svg";
import "./Darkmode.css";

const DarkMode = () => {
    const setDarkMode =()  =>{
        document.querySelector("body").setAttribute("set-theme","dark")
        localStorage.setItem("selectedTheme","dark")

    }
    const setlightMode =()  =>{
        document.querySelector("body").setAttribute("set-theme","light")
        localStorage.setItem("selectedTheme","light")

    }
    const selectedTheme =localStorage.getItem("selectedTheme")
    if(selectedTheme==="dark"){
        setDarkMode() 
       }
   const toggleTheme =(e)=>{
      if(e.target.checked){
         setDarkMode()
      }
        else setlightMode()
   }
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme==="dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
