"use client"
import { useEffect, useState } from "react"
import * as jwt from "jsonwebtoken"
import { usePathname, useRouter } from "next/navigation"
export default function Navbar() {

    const navigateTo = useRouter()
    const [token, setToken] = useState(false)
    const path = usePathname()
    useEffect(() => {
        if (localStorage.token) {
            setToken(true)
        } else {
            setToken(false)
            if (path !== "/login" && path !== "/inscription") {

                navigateTo.push('/login')
            }
        }
    }, [])

    function logout() {
        if (localStorage.token) {
            localStorage.removeItem("token")
        }
    }


    return (
        <>
            {token !== false ?
                (
                    <nav className="w-full">
                        <ul className="flex justify-around w-full font-bold">
                            <a href="/"><li>Accueil</li></a>
                            <a href="/admin"><li>Pannel</li></a>
                            <a href="/parametre"><li>Parametres</li></a>
                            <a href="/login" onClick={logout}><li>Deconnexion</li></a>
                        </ul>
                    </nav>
                ) : null}
        </>
    )
}