import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager{

    private games:Game[]

    private users:WebSocket[]

    private pendingUser:WebSocket | null;

    private color:string

    constructor(){
        this.games=[];
        this.pendingUser=null
        this.users=[];
        this.color="";
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
                    this.color="Black"
                    socket.send("waiting for another player...., your color is black")
                   
                }
                else{
                    const game=new Game(this.pendingUser,socket)
                    this.games.push(game)
                    this.pendingUser=null
                    this.color="White"
                    console.log(this.games)
                    socket.send("game has been started , your color is White")
                }

            }
            if(message.type==MOVE){
                const game=this.games.find(game=>game.player1==socket || game.player2==socket)
                game?.makeMove(socket,message.move)
            }

        })

    }
}