"use strict";
// interface IGame {
//     player1: string;
//     player2: string;
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.moveCount = 0;
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
        //validation here is it user1 move
        //push the move
        //check if game is over
        //update the board
        //send the updated borad to the both users
        try {
            if (this.moveCount % 2 === 0 && socket != this.player1) {
                console.log("coming");
                return;
            }
            if (this.moveCount % 2 === 1 && socket != this.player2) {
                console.log("coming ,here");
                return;
            }
            try {
                this.board.move(move);
                console.log("coming3");
            }
            catch (e) {
                console.log(e);
                return;
            }
            this.moves.push(move);
            console.log(this.board.ascii());
            if (this.board.isGameOver()) {
                this.player1.send(JSON.stringify({
                    type: message_1.GAME_OVER,
                    payload: {
                        winner: this.board.turn() === "w" ? "black" : "white",
                    },
                }));
                this.player2.send(JSON.stringify({
                    type: message_1.GAME_OVER,
                    payload: {
                        winner: this.board.turn() === "w" ? "black" : "white",
                    },
                }));
            }
            if (this.moveCount % 2 === 0) {
                console.log("coming4");
                this.player2.send(JSON.stringify({
                    type: message_1.MOVE,
                    payload: move,
                }));
            }
            if (this.moveCount % 2 === 1) {
                this.player1.send(JSON.stringify({
                    type: message_1.MOVE,
                    payload: move,
                }));
            }
            this.moveCount++;
        }
        catch (e) {
            console.log(e);
            return;
        }
    }
}
exports.Game = Game;
