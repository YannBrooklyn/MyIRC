import { development } from "../config/dbconfig";
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/


export function createPrivates (req: any, res: any){
    const namePrivate: string = req.body.namePrivate
    if ( !RegexCharacter.test(namePrivate)) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("INSERT INTO privates SET ?", {namePrivate: namePrivate}, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            
           return res.status(200).json({message: "Votre salon privée à été creer avec succès."})
        }
    })
}

export function readAllPrivates (req: any, res: any){
    
    development.query("SELECT nameprivate FROM privates", (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les salons privée"})
        }
    })
}

export function readOnePrivates (req: any, res: any){
    const idPrivate: string|number = req.params.idPrivate
    if ( !RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("SELECT nameprivate FROM privates WHERE id = ?", idPrivate, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations du salon privée"})
        }
    })
}

export function deleteOnePrivates (req: any, res: any){
    const idPrivate: string|number = req.params.idPrivate
    if ( !RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("DELETE FROM privates WHERE id = ?", idPrivate, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Salon privée supprimer"})
        }
    })
}

export function updateOnePrivates (req: any, res: any){
    const idPrivate: string|number = req.params.idPrivate
    if ( !RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("UPDATE FROM privates WHERE id = ?", idPrivate, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Salon privée modifier"})
        }
    })
}