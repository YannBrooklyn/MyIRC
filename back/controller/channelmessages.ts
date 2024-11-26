import { development } from "../config/dbconfig";
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/


export function createChannelsMsg (req: any, res: any){
    
    const message: string = req.body.message;
    const idUser: string|number = req.body.idUser;
    const idChannel: string|number = req.body.idChannel


    if (!RegexNumber.test(idUser.toString()) || !RegexNumber.test(idChannel.toString()) || !RegexCharacter.test(message)) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("INSERT INTO channelmessages SET ?", {message: message, idUser: idUser, idChannel: idChannel}, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            
           return res.status(200).json({message: "Votre message à été envoyer avec succès."})
        }
    })
}

export function readAllChannelsMsg (req: any, res: any){
   
    const idChannel: string|number = req.body.idChannel


    if (!RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query(`SELECT channelmessages.message, channelmessages.idUser, channelmessages.idChannel, users.pseudo FROM channelmessages inner join users ON  channelmessages.idUser = users.id WHERE channelmessages.idChannel = ?`, parseInt(req.body.idChannel) ,(err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les messages des channels", allmessages: result})
        }
    })
}

export function readOneChannelsMsg (req: any, res: any){
    const idChnlMSG: string|number = req.params.idChnlMSG
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("SELECT channelmessages.message, channelmessages.idChannel, channelmessages.idUser FROM channelmessages WHERE id = ?", idChnlMSG, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations du message", result: result})
        }
    })
}

export function deleteOneChannelsMsg (req: any, res: any){
    const idChnlMSG: string|number = req.params.idChnlMSG
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    
    development.query("DELETE FROM channelmessages WHERE id = ?", idChnlMSG, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Message supprimer"})
        }
    })
}

export function updateOneChannelsMsg (req: any, res: any){
    const idChnlMSG: string|number = req.params.idChnlMSG
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({message: "Des caractères invalides ont été retrouvé."})
    } 
    development.query("UPDATE FROM channelmessages WHERE id = ?", idChnlMSG, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Message modifier"})
        }
    })
}