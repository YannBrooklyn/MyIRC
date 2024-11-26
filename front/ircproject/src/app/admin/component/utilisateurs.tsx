"use client"

import { allUsersAPI, getUsers, updateUser } from "@/api/users"
import { useEffect, useState } from "react"

export default function Utilisateurs() {

    const [users, setUsers] = useState([])
    async function seeAllUsers() {

        await allUsersAPI()
            .then((result) => {
                console.log(result)
                setUsers(result.data.users)
            })
            .catch((error) => {
                console.log("erreur")
            })
    }

    

    


    useEffect(() => {
        seeAllUsers()

    }, [])



    return (
        <section>

            <table>
                <thead>
                    <tr>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {

                        return (

                            <tr key={index}>
                                <td style={{color: "black"}}><a href={"/admin/users/" + user.id}>{user.pseudo}</a></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </section>
    )
}