'use client'

import { logUser } from "@/api/users"
import { truncate } from "fs/promises"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function FormulaireLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [succesMessage, setSuccesMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    

    const [token, setToken] = useState(false)

    

    const handlelogin = async (event: any) => {
        event.preventDefault();

        const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
        const RegexNumber: RegExp = /[\d]{1}$/
        const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/
        const data = {
            email: email,
            password: password
        }

        if ( !RegexCharacter.test(password)) {

        } else {

            await logUser(data)
            .then((result)=> {
                if (result.data !== undefined) {

                
                setErrorMessage('')
                setSuccesMessage(result.data.message)
                setTimeout(() => {
                    router.push('/')
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
        <form onSubmit={handlelogin} className="flex flex-col gap-6 text-center" action="" method="post">
            <h3 style={{color:"red", fontWeight:"bold"}}>{errorMessage}</h3>
            <h3 style={{color:"green", fontWeight:"bold"}}>{succesMessage}</h3>
            <label htmlFor="inputemail">Email :</label>
            <input onChange={(c) => setEmail(c.target.value)} value={email} id="inputemail" type="text" name="email"  required/>
            <label htmlFor="inputpassword">Password :</label>
            <input onChange={(c) => setPassword(c.target.value)} value={password} type="password" name="password" required/>
            <button style={{ backgroundColor: "#4287f5", color: "white", borderRadius: "2vh" }}>Connexion</button>
        </form>
    )
}