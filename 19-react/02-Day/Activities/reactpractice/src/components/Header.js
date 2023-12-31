import React from "react";
import "../styles/Header.css";

// By importing the Header.css file, it is added to the DOM whenever this component loads
const styles = {
  headerStyle:{
    background:"red"
  },
  headingStyle:{
    "font-size": 100
  }
  
};


const Header = () => (
  <header style={styles.headerStyle} className="header">
    <h1 style={styles.headingStyle}>Welcome</h1>
  </header>
);

export default Header;
