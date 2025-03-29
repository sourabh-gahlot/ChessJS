// interface IGame {
//     player1: string;
//     player2: string;
// }

import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { INIT_GAME } from "./message";


interface move{
    from:String
    to:String
}



export class Game  {
    public player1: WebSocket
    public player2: WebSocket
    private board:Chess;
    private moves:move[]
    private startTime:Date

    

    

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2
        this.board=new Chess()
        this.moves=[]
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
      
    }

    

    makeMove(socket:WebSocket,move:{from:string,to:string}){
        //validation here is it user1 move
        //push the move
        //check if game is over 
        //update the board 
        //send the updated borad to the both users
        if(this.moves.length %2 ===0 && socket!=this.player1){
            return;
        }
        if(this.moves.length %2 ===1 && socket!=this.player2){
            return;
        }

       
        // if(this.player1==socket){
        //     try {
        //         const isValid = this.board.move(move);
        
        //         if (isValid) {
        //             this.moves.push(move)
        //             console.log(this.board.ascii());
        //             console.log(this.moves)
        //             if(!this.board.isGameOver()){
        //                 socket.send("valid move");
        //             }
        //             socket.send("valid move");

        //         } else {
        //             console.log("Invalid move");
        //             socket.send("invalid move");  // Send feedback for invalid move
        //         }
        
        //     } catch (error) {
        //         console.error("Error during move:", error);
        //         socket.send("Error: Invalid move");  // Notify client of the error
        //     }

        // }else{
        //     try {
        //         const isValid = this.board.move(move);
        
        //         if (isValid) {
        //             console.log(this.board.ascii());
        //             console.log(this.moves)
        //             if(!this.board.isGameOver()){
        //                 socket.send("valid move");
        //                 socket.CLOSED;
        //             }
                   
                
        //         } else {
        //             console.log("Invalid move");
        //             socket.send("invalid move");  // Send feedback for invalid move
        //         }
        
        //     } catch (error) {
        //         console.error("Error during move:", error);
        //         socket.send("Error: Invalid move");  // Notify client of the error
        //     }
        // }

    }




}