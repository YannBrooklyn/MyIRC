import axios from "axios"
import * as jwt from "jsonwebtoken"


export const getUsers = async (data: number)=>{
    console.log(data)
    return await axios ({
        method:"get",
        url: `http://localhost:3407/users/get/users/${data}`
        
    })
    .then((result)=>{
        return result
    })
    .catch((error)=>{
        return error
    })
}

export const newUser = async(data: any) => {
    return await axios ({
        method:"post",
        url: "http://localhost:3407/users/new/users",
        data: data,
    })
    .then((result) => {
        return result
    })
    .catch((error)=> {
        return error
    })
}

export const logUser = async(data: any) => {
    return await axios({
        method: "post",
        url: "http://localhost:3407/users/login/users/",
        data: data,
        
    })
    .then((result)=> {
        
        localStorage.setItem('token', result.data.token)
        return result
    })
    .catch((error)=> {
        return error
    })
}

export const updateUser = async(data: any) => {
    
    return await axios({
        method: "put",
        url: `http://localhost:3407/users/put/users/${data.idUser}`,
        data: data
    })
    .then((result)=> {
        console.log(result)
        return result
    })
    .catch((error)=> {
        console.log(error)
        return error
    })
}

export const allUsersAPI = async () => {
    return await axios ({
        method:"get",
        url: "http://localhost:3407/users/get/users/all"
    })
    .then((result)=>{
        return result
    })
    .catch((error)=> {

        return error
    })
}

export const delUser = async (data: object) =>{
    return await axios ({
        method: "delete",
        url: `http://localhost:3407/users/delete/users/${data.idUser}`
    })
    .then((result)=>{
        console.log(result)
        return result
    })
    .catch((error)=>{
        console.log(error)
        return error
    })
}