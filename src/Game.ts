// interface IGame {
//     player1: string;
//     player2: string;
// }

import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

interface move {
    to: String;
    from: String;
}

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: move[];
  private startTime: Date;
  private moveCount:number


  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.moveCount=0

    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    //validation here is it user1 move
    //push the move
    //check if game is over
    //update the board
    //send the updated borad to the both users

    try {
      if (this.moveCount % 2 === 0 && socket != this.player1) {

        return;
      }
      if (this.moveCount % 2 === 1 && socket != this.player2) {

        return;
      }
      try {
        this.board.move(move);
     
      } catch (e) {
        console.log(e)
        return;
      }
 

      this.moves.push(move);
      console.log(this.board.ascii())
      if (this.board.isGameOver()) {
        this.player1.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              winner: this.board.turn() === "w" ? "black" : "white",
            },
          })
        );
        this.player2.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: {
              winner: this.board.turn() === "w" ? "black" : "white",
            },
          })
        );
      }
      if (this.moveCount % 2 === 0) {
       
        this.player2.send(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
      }
      if (this.moveCount % 2 === 1) {
        this.player1.send(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
      }
      this.moveCount++
    } catch (e) {
        console.log(e)
      return;
    }
  }
}
