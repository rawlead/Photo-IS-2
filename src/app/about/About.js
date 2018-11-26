import React, { Component } from 'react';
import { Layout } from '../common';

import rowImg from '../../assets/sunset-cat.jpg';
import cameraImg1 from '../../assets/camera-lens.jpg';
import cameraImg2 from '../../assets/camera-lens-hand.jpg';
import logo from '../../assets/photo-is-logo.png';
import ivanImg from '../../assets/ivan_shyrai.jpg';


class About extends Component {
  render() {
    return (
      <Layout title="About">
        <div className="container-fluid parallax parallax-one" id="photoRoot">
          <div className="caption">
            <div className="caption-content row">
              <div className="col-md-12">
                <img src={logo} alt="logo" />
                <h1>PHOTO PORTAL</h1>
                <div className="arrow bounce">
                  <a rel="arrow-down" href="#goto-content-one"> <i className="fa fa-arrow-down fa-2x" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div id="parallax-content-one" className="row">
            <div className="col-md-3 col-6 offset-md-2">
              <span id="goto-content-one"> &nbsp; </span>
              <h4>Welcome</h4>
              <h5>To Our Photo Portal</h5>
              <h6><span style={{ color: '#297045' }}>Share </span> and <span
                style={{ color: '#EEB902' }}>Explore</span></h6>
            </div>
            <div className="col-md-5 col-6 parallax-content-btngroup">
              <a href="/signup" className="btn-outline-success btn">Create Account</a>
              <a href="/signin" className="btn-outline-warning btn">Log In</a>
            </div>
          </div>
        </div>

        <div className="parallax parallax-two"></div>

        <div id="parallax-content-two" className="container-fluid">
          <div className=" row">
            <div className="col-md-10 offset-md-2">
              <h1>About Us</h1>
              <img className="about-img" src={rowImg} alt="about-img" />
              <h5>We help photographers from all over the world to create and design beautiful products</h5>
            </div>
          </div>
          <div className="row about-row">
            <div className="col-md-2 offset-md-4 col-4">
              <img className="about-img-content" src={cameraImg1} alt="" />
            </div>
            <div className="col-md-4 col-8">
              <h3>Used technologies - Front End:</h3>
              <h6>HTML5, CSS3, Bootstrap4, JavaScript, VueJS, JQuery, Axios, Font Awesome, Progress Bar 4, Animate
                CSS </h6>
            </div>
          </div>
          <div className="row about-row">
            <div className="col-md-4 offset-md-4 col-8" style={{verticalAlign: 'middle'}}>
              <h3>Used technologies - Back End:</h3>
              <h6>Java, Spring, Spring MVC, Spring Security, Spring Data,
                Hibernate, MySQL Database, Amazon Web Services, OAuth2</h6>
            </div>
            <div className="col-md-2 col-4 ">
              <img className="about-img-content" src={cameraImg2} alt="" />
            </div>
          </div>

          <div className="row about-row">
            <div className="col-md-2 offset-md-4 col-4">
              <img className="about-img-content" src={ivanImg} alt="" />
            </div>
            <div className="col-md-4 col-8">
              <h3>Author:</h3>
              <h6>Ivan Shyrai</h6>
              <h6>Społeczna Akademia Nauk</h6>
              <h6>Warsaw 2018</h6>
            </div>
          </div>

          <div className="row about-row">
            <div className="col-md-10 offset-md-2">
              CC0 1.0 Universal (CC0 1.0)
            Public Domain Dedication <br />
              <a href="https://creativecommons.org/publicdomain/zero/1.0/"><img src="https://licensebuttons.net/p/zero/1.0/88x31.png"  alt="creative-commons"/></a> <br />
              <a style={{ color: '#EEB902' }} rel="stylesheet" href="https://github.com/rawlead/Photo-IS">Project Source Code</a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default About;
