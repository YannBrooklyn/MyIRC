import { development } from "../config/dbconfig";
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/
const RegexColor: RegExp= /#[a-zA-Z\d]{6,6}$/


export function createRoles (req: any, res: any){
    const nameRole: string = req.body.nameRole
    const colorRole: string =  req.body.colorRole
    if ( !RegexCharacter.test(nameRole) || !RegexColor.test(colorRole)) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("INSERT INTO roles SET ?", {nameRole: nameRole, colorRole: colorRole}, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            
           return res.status(200).json({message: "Votre roles à été creer ave succès."})
        }
    })
}

export function readAllRoles (req: any, res: any){
    
    development.query("SELECT nameRole, colorRole FROM roles", (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les roles", allRoles: result})
        }
    })
}

export function readOneRoles (req: any, res: any){
    const idRole: string|number = req.params.idRole
    if ( !RegexNumber.test(idRole.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("SELECT nameRole, colorRole FROM roles WHERE id = ?", req.params.idRole, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations du roles", result: result})
        }
    })
}

export function deleteOneRoles (req: any, res: any){
    const idRole: string|number = req.params.idRole
    if ( !RegexNumber.test(idRole.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("DELETE FROM roles WHERE id = ?", idRole, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations de l'utilisateurs"})
        }
    })
}

export function updateOneRoles (req: any, res: any){
    const idRole: string|number = req.params.idRole
    if ( !RegexNumber.test(idRole.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("UPDATE FROM roles WHERE id = ?", idRole, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations de l'utilisateurs"})
        }
    })
}