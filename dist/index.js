"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager;
wss.on('connection', function connection(ws) {
    console.log("connected");
    gameManager.addUser(ws);
    //   ws.on('message', function incoming(message) {
    //     try {
    //         const data = JSON.parse(message.toString()); // Parse the JSON string
    //         console.log("Received message:", data);
    //         if (data.type === "init") {
    //             console.log("Received init event:", data);
    //             // Handle "init" event
    //             ws.send(JSON.stringify({ status: "success", message: "Init received" }));
    //         } else {
    //             console.log("Unknown event type:", data.type);
    //         }
    //     } catch (error) {
    //         console.error("Invalid JSON format:", error);
    //     }
    // });
    ws.send("e3, e4");
    ws.on('close', function () {
        console.log("insidee");
    });
});
