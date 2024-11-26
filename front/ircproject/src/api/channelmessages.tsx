import axios from "axios"


export const allMessagesAPI = async (data: any) => {
    return await axios ({
        method:"post",
        url: "http://localhost:3407/channelmessages/get/channelmsg/all",
        data: data
    })
    .then((result)=>{
        return result
    })
    .catch((error)=> {

        return error
    })
}

export const newChannelMessage = async (data: any) =>{
    return await axios ({
        method:'post',
        url:'http://localhost:3407/channelmessages/new/channelmsg/',
        data: data
    })
    .then((result)=>{
        return result
    })
    .catch((error)=>{
        return error
    })
}