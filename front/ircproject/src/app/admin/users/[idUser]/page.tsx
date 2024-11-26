"use client"
import { allUsersAPI, delUser, getUsers, updateUser } from "@/api/users";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function pannelUser() {

    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const idUser = useParams().idUser
    const [histoUser, setHistoUser] = useState([])
    const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
    const RegexNumber: RegExp = /[\d]{1}$/
    const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/
    let redirect = useRouter()

    async function putUser(event: any) {
        event.preventDefault();
        const data = {
            idUser: idUser,
            pseudo: pseudo,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        if (!RegexCharacter.test(pseudo) || !RegexCharacter.test(password)  || !RegexNumber.test(idUser.toString())) {

        } else {

            await updateUser(data)
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    async function destroyUser(event: any) {
        event.preventDefault();
        const data = {
            idUser: idUser
        }

        if (!RegexNumber.test(idUser.toString())) {
            
        } else {

            await delUser(data)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    async function verifySlug() {
        await allUsersAPI()
        .then((result)=> {
            console.log(result.data.users)
            let myArray = []
            result.data.users.forEach(element => {
                myArray.push(element.id.toString())
                
            });
            console.log(idUser)
            if (!myArray.includes(idUser)) {
                
                redirect.push("/admin")
            }
        })
    }


    async function readUser() {
        if (!RegexNumber.test(idUser.toString())) {

        } else {

            await getUsers(parseInt(idUser))
            .then((result) => {
                console.log(result)
                setHistoUser(result.data.result)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    useEffect(() => {
        readUser()
        verifySlug()
    }, [])
    return (
        <section>


            <form onSubmit={putUser} action="post" method="post">

                <label htmlFor="inputPseudo">Pseudo</label>
                <input value={pseudo} onChange={(c) => setPseudo(c.target.value)} type="text" name="inputPseudo" required/>
                <label htmlFor="inputEmail">Email</label>
                <input value={email} onChange={(c) => setEmail(c.target.value)} type="text" name="inputEmail" required/>
                <label htmlFor="inputPassword">Password</label>
                <input value={password} onChange={(c) => setPassword(c.target.value)} type="password" name="inputPassword" required/>
                <label htmlFor="inputConfirmPassword">Confirmation Password</label>
                <input value={confirmPassword} onChange={(c) => setConfirmPassword(c.target.value)} type="password" name="inputConfirmPassword" required/>
                
                
                <button>Modifier</button>
            </form>
            <form onSubmit={destroyUser} action="" method="post">

                <button style={{ backgroundColor: "red", color: "white" }}>Supprimer utilisateur</button>
            </form>
            <div style={{ height: "30vh", overflow: "scroll", backgroundColor: "white" }}>
                <h3>Historique de message :</h3>
                {histoUser.map((histo, index) => {
                    return (
                        <p key={index}>Dans le channel : {histo.nameChannel} <br /> {histo.pseudo} : {histo.message}</p>
                    )
                })}
            </div>
        </section>

    )

}