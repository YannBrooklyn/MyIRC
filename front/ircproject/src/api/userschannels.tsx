import axios from "axios"

export async function newJoinChannel(data: any) {
    return await axios ({
        method:"post",
        url:"http://localhost:3407/userschannels/new/userschannels",
        data: data
    })
    .then((result)=>{
        return result
    })
    .catch((error)=>{
        return error
    })
}