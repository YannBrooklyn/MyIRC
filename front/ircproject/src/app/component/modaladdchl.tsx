"use client"

import newChannel from "@/api/channel"
import { useEffect, useState } from "react"

export default function ModalAddChannel() {

    const [nameChannel, setNameChannel] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [succesMessage, setSuccesMessage] = useState('')

    async function handleNewChnl(event: any) {
        event.preventDefault();
        const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
        const RegexNumber: RegExp = /[\d]{1}$/
        const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/
        const data = {
            nameChannel: nameChannel
        }
        if (!RegexCharacter.test(nameChannel)) {
            
        } else {

            await newChannel(data)
        .then((result: any)=>{
            setSuccesMessage(result.data.message)
            setErrorMessage(result.response.data.message)
        })
        .catch((error: any)=>{
            setErrorMessage('Une erreur est survenu')
        })
    }

    }
    function offModal(){
        const myModal = document.querySelector('#ModalNewChannel')
        myModal ?
        myModal.style.display = "none" : null
    }

    return (
        <dialog id="ModalNewChannel" className="none justify-center fixed" style={{width:"50vw", height:"auto", backgroundColor:"#4287f5"}}>
            <form onSubmit={handleNewChnl} className="flex flex-col gap-6 text-center w-11/12" action="" method="post">
                <h3 style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</h3>
                <h3 style={{ color: "green", fontWeight: "bold" }}>{succesMessage}</h3>
                
                <label htmlFor="nameCHNL">Nom du channel</label>
                <input id="nameCHNL" value={nameChannel} onChange={(c) => setNameChannel(c.target.value)} type="text" />

                <button style={{ backgroundColor: "white", color: "#4287f5", borderRadius: "2vh" }} onClick={offModal}>Create</button>
            </form>
        </dialog>
    )
}