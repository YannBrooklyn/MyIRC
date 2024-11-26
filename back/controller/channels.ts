import { development } from "../config/dbconfig";
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/

export function createChannels (req: any, res: any){
    const nameChannel: string = req.body.nameChannel
    if ( !RegexCharacter.test(nameChannel)) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("INSERT INTO channels SET ?", {nameChannel: nameChannel}, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } else { 
           return res.status(200).json({message: "Votre channel à été creer avec succès."})
        }
    })
}

export function readAllChannels (req: any, res: any){
    
    development.query("SELECT id, nameChannel FROM channels", (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les channels", channels: result})
        }
    })
}

export function readOneChannels (req: any, res: any){
    const idChannel: string|number = req.params.idChannel
    if ( !RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("SELECT nameChannel FROM channels WHERE id = ?", idChannel, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations du channel privée"})
        }
    })
}

export function deleteOneChannels (req: any, res: any){
    const idChannel: string = req.params.idChannel
    if ( !RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("DELETE FROM channels WHERE id = ?", idChannel, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "channel supprimer"})
        }
    })
}

export function updateOneChannels (req: any, res: any){
    const idChannel: string = req.params.idChannel
    if ( !RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("UPDATE FROM channels WHERE id = ?", idChannel, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "channel privée modifier"})
        }
    })
}