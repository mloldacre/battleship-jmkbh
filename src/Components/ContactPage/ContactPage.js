import React, { Component } from "react";
import bubbateaspaceman from './images/bubbateaspaceman.png'
import coffeecupspaceman from './images/coffeecupspaceman.png'
import coffeespaceman from './images/coffeespaceman.png'
import professionalspaceman from './images/professionalspaceman.png'
import superspaceman from './images/superspaceman.png'
import workoutspaceman from './images/workoutspaceman.png'

import "./contactpage.css";

export default class ContactPage extends Component {
  render() {
    return (
      <>
        <div className="devTeamPage">
          <h2>
            The development and execution of this game was not possible without
            the brilliance and dedication of these talented individuals.
          </h2>
          <div className="theDevs">
            <div className="devContainers" name="michael">
                <img className="devImg" src={superspaceman} alt=""/>
                <h3>Michael Oldacre</h3>
              <p>Project Manager, client side, server side</p>
              <p>www.linkedin.com/in/mloldacre</p>
              <a target="_blank" href="https://www.linkedin.com/in/mloldacre/">Portfolio</a>
            </div>
            <div className="devContainers" name="jackie">
            <img className="devImg" src={coffeecupspaceman} alt=""/>
              <h3>Jackie Bishop</h3>
              <p>Design Lead, front end, client side</p>
              <p>www.jackiebishop.rocks</p>
              <a target="_blank" href="https://jackiebishop.rocks/">Portfolio</a>
            </div>
            <div className="devContainers" name="brett">
            <img className="devImg" src={workoutspaceman} alt=""/>
            <h3>Brett Westerlund</h3>
              <p>Logic, back end</p>
              <p>www.drbretto.com</p>
              <a target="_blank" href=" https://drbretto.com/">Portfolio</a>
            </div>
            <div className="devContainers" name="kameron">
            <img className="devImg" src={coffeespaceman} alt=""/>
              <h3>Kameron Masullo</h3>
              <p>Audio developer, composer, front end</p>
              <p>www.kameronmasullo.com</p>
              <a target="_blank" href="http://kameronmasullo.com/">Portfolio</a>
            </div>
            <div className="devContainers" name="hanna">
            <img className="devImg" src={bubbateaspaceman} alt=""/>
              <h3>Hanna Hart</h3>
              <p>Server side, client side, testing</p>
              <p>www.hannahcheyenne.github.io/my-portfolio</p>
              <a target="_blank" href="https://hannahcheyenne.github.io/my-portfolio/">Portfolio</a>
            </div>
            <div className="devContainers" name="teddy">
            <img className="devImg" src={professionalspaceman} alt=""/>
              <p>
                Shout out to Teddy for putting up with us, and inspiring us to
                always strive to do better, be better, reach for the stars.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

