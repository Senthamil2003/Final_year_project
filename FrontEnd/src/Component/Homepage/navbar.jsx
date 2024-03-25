import React, { Component } from "react";
import Logo from "../images/logo1.jpeg";
import "../../css/navbar.css";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <div>
               <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <img
                src={Logo}
                alt="NoBlues"
                height="40px"
                width="40px"
                style={{marginLeft:"30px"}}
            />{" "}
            <a class="navbar-brand" href="/home">PrepGenix</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0 ">
                   
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/home">Home</a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/home">Prepare</a>
                    </li> */}
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/resumeUpload"><img src="30.png" alt=""/> AI interview</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/dashboard"><img src="30.png" alt=""/> Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/"><img src="30.png" alt=""/> Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
            </div>
        );
    }
}

export default Navbar;
