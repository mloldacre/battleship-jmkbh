import React, { Component } from "react";
import BoardRender from "../BoardRender/BoardRender";
import BattleshipAPI from "../../services/battleship-api-service";
import "./gameboard.css";
import PlayerBoardRender from "../PlayerBoardRender/PlayerBoardRender";
import SetPlayerBoardRender from "../SetPlayerBoardRender/SetPlayerBoardRender";
import Context from "../../Context";
import Audio from "../../services/audio";
import GetAiMove from "./GetAiMove";
import EndGameTrigger from "./EndGame/EndGameTrigger";
import EndGameOverlay from "./EndGameOverlay/EndGameOverlay";
import HealthBar from "./HealthBar/HealthBar";
class GameBoard extends Component {
  constructor() {
    super();
    this.playerMove = this.playerMove.bind(this);
    this.state = {
      idfromBoard: "",
      //player
      id: 1,
      p1_board: [
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
      ],
      //opponent
      p2_board: [
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
      ],
      p1_health: [2, 3, 3, 4, 5],
      p2_health: [2, 3, 3, 4, 5],
      player_turn: true,
      //whether game is over
      active_game: false,
      endScreen: false,
      //disabled: false,
    };
  }
  static contextType = Context;

  newGame = (playerBoard) => {
    this.context.handleTheme("game.mp3");
    let initialState = {
      p1_board: playerBoard,
      p2_board: playerBoard,
      p1_health: [2, 3, 3, 4, 5],
      p2_health: [2, 3, 3, 4, 5],
      player_turn: true,
      active_game: true,
    };

    BattleshipAPI.newGame(initialState).then((data) => {
      const gameState = data.gameState;
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

  hitSound = (bef, aft) => {
    let hit = false;
    for (let i = 0; i < bef.length; i++) {
      if (bef[i] !== 0 && aft[i] === 0) {
        Audio.laser();
        Audio.attackSound(true, true);
        hit = true;
      }
      if (bef[i] > aft[i] && aft[i] !== 0) {
        Audio.laser();
        Audio.attackSound(true);
        hit = true;
      }
    }
    hit === false && Audio.attackSound(false);
    return aft;
  };

  winTheme = (p2) => {
    p2.reduce((a, b) => a + b) === 0 && this.context.handleTheme("win.mp3");
  };

  loseTheme = (p1) => {
    p1.reduce((a, b) => a + b) === 0 && this.context.handleTheme("lose.mp3");
  };

  getAiMove = () => {
    const gameId = this.state.id;
    BattleshipAPI.getAiMove(gameId)
      .then((data) => {
        const gameState = data.gameState;
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
      })
      .then(() => this.loseTheme(this.state.p1_health));
  };

  postMove = () => {
    let gameId = this.state.id;
    let split = this.state.idfromBoard.split(".");
    let x = Number(split[0]);
    let y = Number(split[1]);
    let p2Health = this.state.p2_health;

    if (this.state.p2_board[x][y] <= 7) {
      BattleshipAPI.postMove(gameId, x, y)
        .then((data) => {
          const gameState = data.gameState;
          this.setState(
            {
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
            },
            () => (p2Health = this.hitSound(p2Health, gameState.p2_health))
          );
        })
        .then(() => this.winTheme(p2Health));
    }
  };
  playerMove(id) {
    this.setState(
      {
        idfromBoard: id,
      },
      () => this.postMove()
    );
  }
  gameOver = () => {
    this.setState({
      endScreen: true,
    });
  };
  gameOn = () => {
    this.setState(
      {
        endScreen: false,
      },
      () => this.context.handleTheme("menu.mp3")
    );
  };
  render() {
    return (
      <>
        <div className="gamePage">
          <div className="gameBoard">
            {this.state.active_game && (
              <HealthBar health={this.state.p1_health} />
            )}
            {!this.state.active_game && <EndGameTrigger func={this.gameOver} />}
            {this.state.endScreen && (
              <EndGameOverlay func={this.gameOn} state={this.state} />
            )}
            {!this.state.player_turn && (
              <GetAiMove func={this.getAiMove}></GetAiMove>
            )}
            <div className="player" id="player">
              {!this.state.active_game && !this.state.endScreen && (
                <PlayerBoardRender
                  newGame={this.newGame}
                  disabled={this.state.active_game}
                  test={this.state.p1_board}
                  key={this.state.p1_board}
                />
              )}
              {this.state.active_game && (
                <SetPlayerBoardRender
                  test={this.state.p1_board}
                  key={this.state.p1_board}
                  disabled={true}
                />
              )}
            </div>
          </div>
          <div className="gameBoard">
            {this.state.active_game && (
              <HealthBar health={this.state.p2_health} />
            )}
            <div className="opponent" id="opponent">
              {this.state.active_game && (
                <BoardRender
                  test={this.state.p2_board}
                  key={this.state.p2_board}
                  playerMove={this.playerMove}
                  disabled={!this.state.active_game}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default GameBoard;
