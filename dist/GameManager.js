"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const message_1 = require("./message");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
        this.color = "";
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => {
            user !== socket;
        });
    }
    handleMessage() {
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == message_1.INIT_GAME) {
                if (!this.pendingUser) {
                    this.pendingUser = socket;
                    this.color = "Black";
                    socket.send("waiting for another player...., your color is black");
                }
                else {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                    this.color = "White";
                    console.log(this.games);
                    socket.send("game has been started , your color is White");
                }
            }
            if (message.type == message_1.MOVE) {
                const game = this.games.find(game => game.player1 == socket || game.player2 == socket);
                game === null || game === void 0 ? void 0 : game.makeMove(socket, message.move);
            }
        });
    }
}
exports.GameManager = GameManager;
