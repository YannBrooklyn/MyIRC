'use client'
import { allMessagesAPI, newChannelMessage } from "@/api/channelmessages"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import * as jwt from "jsonwebtoken"
import { getUsers } from "@/api/users"
const socket = io("http://localhost:3009")

export default function Chatbox() {

    const [themsg, setTheMSG] = useState('')
    const [msgReceived, setMsgReceived] = useState('')
    const [decTok, setDecTok] = useState('')
    const [room, setRoom] = useState("")
    const [pseudo, setPseudo] = useState('')
    const [changeState, setChangeState] = useState(0)

    async function test() {
        socket.emit("send_message", { themsg, room, decTok })

        setChangeState(changeState + 1)
        

        function createNewElement(name: string) {

            const newPForMe = document.createElement('p')
            newPForMe.setAttribute('id', 'newP')
            const divMessage = document.querySelector("#divMessage")
            divMessage.appendChild(newPForMe)
            newPForMe.innerText = name + "s: " + themsg
        }
        const token: string = jwt.decode(localStorage.token).id

        await getUsers(token)
            .then((result) => {
                setPseudo(result.data.result[0].pseudo)
                console.log(result.data.result[0])
                createNewElement(result.data.result[0].pseudo)
            })
            .catch(() => {
                setPseudo("Erreur")
            })
    }

    function forRoom() {
        if (room !== "") {
            socket.emit("join_room", room)
        }
        
        if (changeState !== 0) {
            for (let i = 0; i <= changeState; i++){
                if (i === changeState){
                    setChangeState(0)
                    console.log("yeaaahh")
                } else {
                    const newP = document.querySelector("#newP")
                    console.log("on passe ici oui")
                    newP.remove()
                }
            }
        }
    }

    async function postChnlMsg(event: any) {
        const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
    const RegexNumber: RegExp = /[\d]{1}$/
    const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/

        event.preventDefault();
        const idUser = jwt.decode(localStorage.token).id

        const data = {
            idUser: idUser,
            message: themsg,
            idChannel: room
        }
        if (!RegexNumber.test(idUser) || !RegexCharacter.test(themsg) || !RegexNumber.test(room)) {

        } else {

            await newChannelMessage(data)
        }
    }
    function ReceiveMessage(event: any) {
        event.preventDefault();

        const data = {
            idChannel: room
        }

        allMessagesAPI(data)
            .then((res) => {
                setAllMessagesChan(res.data.allmessages)
            })
            .catch((error) => {
                console.log(error)
            })
        if (localStorage.token) {
            const id = jwt.decode(localStorage.token)
            id ? setDecTok(id.id) : null

        }
    }



    const [allMessagesChan, setAllMessagesChan] = useState([])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMsgReceived(data.themsg)
        })

    }, [socket])

    async function viaSocket() {


        function createNewElement(name: string) {

            const newP = document.createElement('p')
            newP.setAttribute('id', 'newP')
            const divMessage = document.querySelector("#divMessage")
            divMessage.appendChild(newP)
            newP.innerText = name + "r: " + msgReceived
            console.log(msgReceived)
        }

        await getUsers(jwt.decode(localStorage.token).id)
            .then((result) => {
                setPseudo(result.data.result.pseudo)
                console.log(result.data.result.pseudo)
                createNewElement(result.data.result[0].pseudo)
            })
            .catch(() => {
                setPseudo("Erreur")
            })

    }

    

    useEffect(() => {
        if (msgReceived !== "") {
            viaSocket()
        }
    }, [msgReceived])


    return (
        <section style={{ position: "relative", borderStyle: "solid", borderColor: "#000000", borderWidth: "0.2vh", height: "70vh" }}>
            <h2 style={{ height: "5%" }}>The channel</h2>
            <form action="" method="post" onSubmit={ReceiveMessage}>

                <input onChange={(c) => setRoom(c.target.value)} value={room} style={{ color: "black", width: "80%" }} type="text" name="message" />
                <button style={{ width: "20%", backgroundColor: "#4287f5", color: "white" }} onClick={forRoom}>Join room</button>
            </form>
            <div id="divMessage" style={{ overflow: "auto", height: "90%", backgroundColor: "whitesmoke" }}>


                {allMessagesChan.map((message, index) => {
                    return (
                        <p key={index}>{message.pseudo}: {message.message}</p>
                    )
                })
                }
            </div>
            <div style={{ position: "absolute", bottom: "0", height: "5%", width: "100%" }}>
                <form action="" onSubmit={postChnlMsg} method="post">
                    <input onChange={(c) => setTheMSG(c.target.value)} value={themsg} style={{ color: "black", width: "80%" }} type="text" name="message" />
                    <button onClick={test} style={{ width: "20%", backgroundColor: "#4287f5", color: "white" }}>Send</button>
                </form>
            </div>
        </section>
    )
}