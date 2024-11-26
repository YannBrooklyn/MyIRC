"use client"

import { allChannel } from "@/api/channel"
import { newJoinChannel } from "@/api/userschannels"
import { useEffect, useState } from "react"
import * as jwt from "jsonwebtoken"


export default function SomeChannels() {
    const [theChannels, setTheChannels] = useState([])
    const [theRoom, setTheRoom] = useState('')
    let testttt = 0;

    useEffect(() => {
        allChannel()
            .then((result) => {
                setTheChannels(result.data.channels)
                console.log(result.data.channels)
            })
            .catch((error) => {

            })
    }, [])

    return (
        <>
            {theChannels.map((channel, index) => {

                return (

                        <div key={index}>
                            <h3 style={{fontSize:"3vh"}}>{channel.nameChannel}</h3>
                            <p style={{fontSize:"2vh"}}>Code Room:  {channel.id}</p>
                        </div>

                )
            })}

        </>
    )
}