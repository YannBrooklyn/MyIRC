'use client'

import { newUser } from "@/api/users"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Formulaire() {
    const router = useRouter()
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [succesMessage, setSuccesMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState(false)
    const handleinscr = async (event: any) => {
        event.preventDefault();
        const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
        const RegexNumber: RegExp = /[\d]{1}$/
        const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/

        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        

            
            await newUser(data)
            .then((result)=> {
                if (result.data !== undefined) {

                
                    setErrorMessage('')
                setSuccesMessage(result.data.message)
                setTimeout(() => {
                    router.push('/login')
                }, 1200);
            } else if (result.response !== undefined) {
                setSuccesMessage('')
                setErrorMessage(result.response.data.message)
            } else {
                setErrorMessage('Une erreur est survenu')
            }
            
        })
        .catch((error)=> {
            setErrorMessage("Une erreur est survenu.")
            setSuccesMessage('')
        })
    }
    useEffect(() => {
        if (localStorage.token) {
            setToken(true)
            router.push('/')
        } else {
            setToken(false)
        }
    }, [token])


    return (
        <form onSubmit={handleinscr} className="flex flex-col gap-6 text-center" action="" method="post">
            <h3 style={{color:"red", fontWeight:"bold"}}>{errorMessage}</h3>
            <h3 style={{color:"green", fontWeight:"bold"}}>{succesMessage}</h3>
            <label htmlFor="inputpseudo">Pseudo :</label>
            <input onChange={(c) =>setPseudo(c.target.value)} value={pseudo} id="inputpseudo" type="text" name="pseudo" required/>
            <label htmlFor="inputemail">Email :</label>
            <input onChange={(c) =>setEmail(c.target.value)} value={email} id="inputemail" type="text" name="email" required/>
            <label htmlFor="inputpassword">Password :</label>
            <input onChange={(c) =>setPassword(c.target.value)} value={password} id="inputpassword" type="password" name="password" required/>
            <label htmlFor="inputconfirmpassword">Confirmation password :</label>
            <input onChange={(c) =>setConfirmPassword(c.target.value)} value={confirmPassword} id="inputconfirmpassword" type="password" name="password" required/>
            <button style={{ backgroundColor: "#4287f5", color: "white", borderRadius: "2vh" }}>Connexion</button>
        </form>
    )
} 