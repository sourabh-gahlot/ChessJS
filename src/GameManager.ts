import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager{

    private games:Game[]

    private users:WebSocket[]

    private pendingUser:WebSocket | null;



    constructor(){
        this.games=[];
        this.pendingUser=null
        this.users=[];
      
    }


    addUser(socket:WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }


    removeUser(socket:WebSocket){
        this.users=this.users.filter((user)=>{
            user!==socket
        })
    }


    private handleMessage(){

    }

    private addHandler(socket:WebSocket){

        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString())
            if(message.type==INIT_GAME){
                if(!this.pendingUser){
                    this.pendingUser=socket
                    socket.send("waiting for another player....")
                   
                }
                else{
                    const game=new Game(this.pendingUser,socket)
                    this.games.push(game)
                    this.pendingUser=null
                    socket.send("game has been started")
                }

            }
            if(message.type==MOVE){
                const game=this.games.find(game=>game.player1==socket || game.player2==socket)
                game?.makeMove(socket,message.move)
            }

        })

    }
}