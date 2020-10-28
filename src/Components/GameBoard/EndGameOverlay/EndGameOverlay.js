//display who won, do you want to play again, do you want to go back
//close button
//button to link to dashboard
//will be able to close out websocket in the future
//super hacky when the page initially loads, you can see the game component render, then the overlay pop up
//need to find a better way to refactor this so it's not so glitchy.
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Audio from '../../../services/audio'
import "./endgameoverlay.css";
export default class EndGameOverlay extends Component {
  endGame = () => {
    const { p1_health, p2_health } = this.props.state;
    let p1 = p1_health.reduce((a, b) => {
      return a + b;
    });
    let p2 = p2_health.reduce((a, b) => {
      return a + b;
    });
    let message = <></>;
    if (p1 !== 17) {
      if (p2 === 0) {
        Audio.playTheme('win.mp3')
        message = <h2>You are victorious!</h2>;
      }
      if (p1 === 0) {
        Audio.playTheme('lose.mp3')
        message = <h2>You have lost the battle!</h2>;
      }
      return (
        <>
          <div className="endGameOverlay">{message}</div>
          <button onClick={this.props.func}>Play Again</button>
          <Link to="/dashboard"><button>Quit</button></Link>
        </>
      )
    }else{
      return (
        <>
          <div className="endGameOverlay">
            <h2>
                Welcome to Space BattleShip
            </h2>
            <p>To play, click on an anchor point and pick a direction to place your ships. 
                When all of your ships are placed, hit start to begin.
                On the enemy's board, click on a square to try and hit their ships.
                When all ships have been destroyed, the game is over.
                Good luck!</p>
          </div>
          <button onClick={this.props.func}>Begin</button>
          <Link to="/dashboard"><button>Quit</button></Link>
        </>
      );
    }
  };
  render() {
    return <>{this.endGame()}</>;
  }
}
