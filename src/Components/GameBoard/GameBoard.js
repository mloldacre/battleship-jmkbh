import React, { Component } from "react";
import OpponentBoardRender from "../OpponentBoardRender/OpponentBoardRender";
import Header from "../Header/Header";
import ShipContainer from "../ShipContainer/ShipContainer";
import BattleshipAPI from "../../services/battleship-api-service";
import "./gameboard.css";

class GameBoard extends Component {
  constructor() {
    super();
    this.playerMove = this.playerMove.bind(this);
    this.state = {
      idfromBoard: "",
      //player
      id: 1,
      p1_board: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      //opponent
      p2_board: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      p1_health: [2, 3, 3, 4, 5],
      p2_health: [2, 3, 3, 4, 5],
      player_turn: true,
      //whether game is over
      active_game: true,
    };
  }
  componentDidMount() {
    BattleshipAPI.getState(1).then((data) => {
      const gameState = data.gameState[0];
      this.setState({
        id: gameState.id,
        p1_board: gameState.p1_board,
        //opponent
        p2_board: gameState.p2_board,
        p1_health: gameState.p1_health,
        p2_health: gameState.p2_health,
        player_turn: gameState.player_turn,
        //whether game is over
        active_game: gameState.active_game,
      });
    });
  }
  postMove = () => {
    let gameId = this.state.id;
    let split = this.state.idfromBoard.split(".");
    console.log(
      "GameBoard -> postMove -> this.state.idfromBoard",
      this.state.idfromBoard
    );
    let x = Number(split[0]);
    console.log("GameBoard -> postMove -> x", x);
    let y = Number(split[1]);
    console.log("GameBoard -> postMove -> y", y);
    BattleshipAPI.postMove(gameId, x, y).then((data) => {
      const gameState = data.gameState[0];
      this.setState({
        idfromBoard: "",
        id: gameState.id,
        //player
        p1_board: gameState.p1_board,
        //opponent
        p2_board: gameState.p2_board,
        p1_health: gameState.p1_health,
        p2_health: gameState.p2_health,
        player_turn: gameState.player_turn,
        //whether game is over
        active_game: gameState.active_game,
      });
    });
  };
  playerMove(id) {
    this.setState(
      {
        idfromBoard: id,
      },
      () => this.postMove()
    );
  }

  render() {
    console.log("click id in game board", this.state.idfromBoard);
    return (
      <>
        <Header />
        <div className="gamePage">
          <div className="playerShips">
            <ShipContainer />
          </div>
          <div className="gameBoard">
            <div className="player" id="player">
              <OpponentBoardRender
                test={this.state.p2_board}
                key={this.state.p2_board}
                playerMove={this.playerMove}
              />
            </div>
            {/* <div className="opponent" id="opponent"><BoardRender test={test}/></div> */}
          </div>
          <div className="opponentShips">
            <ShipContainer />
          </div>
        </div>
      </>
    );
  }
}
export default GameBoard;
