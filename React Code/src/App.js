import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "./components/router/Routes";
import "./components/shared/css/common.css";
import Footer from "./components/shared/common/Footer";
import Header from "./components/shared/common/Header";


function App() {
  return (
    <div className="App">   
        <Header />
        <Routes />
        <Footer />
    </div>
  );
}

export default withRouter(App);
