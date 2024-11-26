import { development } from "../config/dbconfig";
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/

export function createPVMessages (req: any, res: any){
    const message: string = req.body.message;
    const idUser: string|number = req.body.idUser;
    const idPrivate: string|number = req.body.idChannel


    if (!RegexNumber.test(idUser.toString()) || !RegexNumber.test(idPrivate.toString()) || !RegexCharacter.test(message)) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 

    development.query("INSERT INTO privatemessages SET ?", {message: message, idUser: idUser, idPrivate: idPrivate}, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            
           return res.status(200).json({message: "Votre message à été envoyer avec succès."})
        }
    })
}

export function readAllPVMessages (req: any, res: any){
    
    development.query("SELECT message, idUser, idPrivate FROM privatemessages", (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les messages privées", allMessage: result})
        }
    })
}

export function readOnePVMessages (req: any, res: any){
    const idPVMsg: string|number = req.params.idPVMsg
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    
    development.query("SELECT message, idUser, idPrivate FROM privatemessages WHERE id = ?", idPVMsg, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations du message", result: result})
        }
    })
}

export function deleteOnePVMessages (req: any, res: any){
    const idPVMsg: string|number = req.params.idPVMsg
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    
    development.query("DELETE FROM privatemessages WHERE id = ?", idPVMsg, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Message privée supprimer"})
        }
    })
}

export function updateOnePVMessages (req: any, res: any){
    const idPVMsg: string|number = req.params.idPVMsg
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("UPDATE FROM privatemessages WHERE id = ?", idPVMsg, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Message privée modifier"})
        }
    })
}