import axios from "axios"

export default async function newChannel(data: object) {
    console.log("rooo")
    return await axios({
        method:"post",
        url:'http://localhost:3407/channels/new/channels',
        data:data
    })
    .then((result)=>{
        return result
    })
    .catch((error)=>{
        
        return error
    })
}

export async function allChannel (){
    return await axios ({
        method:"get",
        url:"http://localhost:3407/channels/get/channels/all"
    })
    .then((result)=>{
        return result
    })
    .catch((error)=>{
        return error
    })
}