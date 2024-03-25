import React, { Component } from "react";
import Navbar from "./navbar";
import GenAI from "../images/genAi.jpg";
import Resume from "../images/resume.svg";
import Interaction from "../images/interaction.svg";
import RecentInfo from "../images/recentInfo.svg";
import Events from "../images/event.svg";
import InstituteSignup from "../images/InstituteSignup.svg";
import Suggest from "../images/suggest.svg";
import Footer from "./footer";
import "../../css/homepage.css";
import axios from "axios";
import {  Link, Navigate } from "react-router-dom";

export default function Homepage() {
  return (
    <div><div>
    <Navbar />
    <div className="row g-3">
        <div className=" row d-flex justify-content-center align-items-center">
            <div className="col">
                <h1 className="homeHeading">PrepGenix</h1>
                <h3 className="tagline">
                    Your one stop AI tool for gathering all the
                    knowledege and prepare for interviews.
                </h3>
            </div>
            <div className="col">
                <img
                    style={{ height: "550px" }}
                    src={GenAI}
                    alt="abc"
                />
            </div>
        </div>
    </div>

    <div
        className="row d-flex justify-content-center align-items-center"
        style={{
            borderTop: "1px solid grey",
            paddingLeft: "5%",
            paddingRight: "5%"
        }}
    >
        <div className="col-6">
            <img
                style={{ height: "550px" }}
                src={Resume}
                alt="img2" 
            />
        </div>
        <div className="col-6">
            <h3 className="title">Let's Begin</h3>
            <p className="description">
                Let's begin your interview by uploading Resume
            </p>
            <div style={{display: "flex", position:"relative"}}>
          
            
            </div>
            <a href="/resumeUpload">
            <input
                class="btn btn-primary"
                style={{
                    margin: "20px",
                    marginLeft: "50px",
                    backgroundColor: "#18374b",
                    borderColor: "#18374b",
                }}
                // onClick = {this.searchQuery}
                type="submit"
                value="Upload"
            />
            </a>
        </div>
    </div>

    <div
        className="row d-flex justify-content-center align-items-center"
        style={{
            background: "#33325A",
            paddingLeft: "5%",
            paddingRight: "5%"
        }}
    >
        <div className="col">
            <h3 className="title" style={{ color: "#F0FFFF" }}>
                Dashboard
            </h3>
            <p className="description" style={{ color: "#FFFFFF" }}>
                View previous test feedbacks to upgrade yourself to next level
            </p>
            <a href="/dashboard">
                <input
                    class="btn btn-primary"
                    style={{
                        margin: "20px",
                        marginLeft: "50px",
                        

                    }}
                    type="submit"
                    value="Dashboard"
                />
            </a>

        </div>
        <div className="col">
            <img
                style={{ height: "490px" }}
                src={Events}
                alt="img2"
            />
        </div>
    </div>

   
    {/* <Footer /> */}
</div></div>
  )
}
