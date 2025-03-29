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
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        //validation here is it user1 move
        //push the move
        //check if game is over 
        //update the board 
        //send the updated borad to the both users
        if (this.player1 == socket) {
            try {
                const isValid = this.board.move(move);
                if (isValid) {
                    this.moves.push(move);
                    console.log(this.board.ascii());
                    console.log(this.moves);
                    if (!this.board.isGameOver()) {
                        socket.send("valid move");
                    }
                    socket.send("valid move");
                }
                else {
                    console.log("Invalid move");
                    socket.send("invalid move"); // Send feedback for invalid move
                }
            }
            catch (error) {
                console.error("Error during move:", error);
                socket.send("Error: Invalid move"); // Notify client of the error
            }
        }
        else {
            try {
                const isValid = this.board.move(move);
                if (isValid) {
                    console.log(this.board.ascii());
                    console.log(this.moves);
                    if (!this.board.isGameOver()) {
                        socket.send("valid move");
                        socket.CLOSED;
                    }
                }
                else {
                    console.log("Invalid move");
                    socket.send("invalid move"); // Send feedback for invalid move
                }
            }
            catch (error) {
                console.error("Error during move:", error);
                socket.send("Error: Invalid move"); // Notify client of the error
            }
        }
    }
}
exports.Game = Game;
