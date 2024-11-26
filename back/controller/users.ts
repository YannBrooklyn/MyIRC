
import { development } from "../config/dbconfig";
import * as bcryptjs from "bcryptjs"
import * as jwt from "jsonwebtoken"
const RegexCharacter: RegExp = /[a-zA-Z\d\s]{5,13}$/
const RegexNumber: RegExp= /[\d]{1}$/
const RegexEmail: RegExp= /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/

export function createUsers (req: any, res: any){

    const pseudo: string = req.body.pseudo;
    const password: string = req.body.password;
    const confirmPassword: string = req.body.confirmPassword;
    const email: string = req.body.email;

    
    development.query("SELECT * FROM users WHERE email = ?", email, (err:any, result: any) => {
        
        if (err) {
            console.log(err)
        } 
        else if (result.length !== 0) {
            
            return res.status(400).json({message: "Cette email est déjà enregistrer."})
        } else {
            if (password !== confirmPassword) {
                return res.status(400).json({message: "Mot de passe différent."})
            }

            if (!RegexCharacter.test(password) || !RegexCharacter.test(confirmPassword) || !RegexCharacter.test(pseudo)){
                return res.status(400).json({message:"Des caractères invalides se trouve dans des champs."})
            }

            let salt = bcryptjs.genSaltSync(8)
            let hashedPassword: string = bcryptjs.hashSync(password, salt)
            development.query("INSERT INTO users SET ?", {pseudo: pseudo, email: email, password: hashedPassword, idRole: 3}, (err:any, result: any) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                    return res.status(200).json({message: "Votre compte à été creer avec succès."})
                }
            })
        }
    })
}

export async function loginUsers (req: any, res: any){

    const pseudo: string = req.body.pseudo;
    const password: string = req.body.password;
    const email: string = req.body.email;



    if (!RegexCharacter.test(password) || !RegexCharacter.test(pseudo)){
        return res.status(400).json({message:"Des caractères invalides se trouve dans des champs."})
    }

    development.query("SELECT * FROM users WHERE email = ?", email, (err:any, result: any) => {
        if (err) {
            console.log(err)
        } 
        else if (result.length === 0) {
            return res.status(400).json({message: "Email non reconnu."})
        } 
        else if (result.length !== 0){
            const verifyPassword =  bcryptjs.compareSync(password, result[0].password)
            if (verifyPassword === true) {
                const token: string = jwt.sign({id: result[0].id}, 'waza')
                return res.status(200).json({message: "Connecté", token: token})
            } else {
                return res.status(400).json({message: "Wrong password."})
            }
        } else {
            return res.status(500).json({message: "Une erreur s'est produite."})
        }
    })
}

export function readAllUsers (req: any, res: any){
    
    development.query("SELECT id, pseudo, email FROM users", (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici tout les utilisateurs", users: result})
        }
    })
}

export function readOneUsers (req: any, res: any){
    const idUser: string|number = req.params.idUser

    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({message: "ID non valide"})
    }
    


    development.query("SELECT users.pseudo, users.email, channels.nameChannel , channelmessages.message FROM users inner join channelmessages on users.id = channelmessages.idUser inner join channels on channelmessages.idChannel = channels.id WHERE users.id = ?", idUser,  (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations de l'utilisateurs", result: result})
        }
    })
}

export function deleteOneUsers (req: any, res: any){

    const idUser: string|number = req.params.idUser

    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({message: "ID non valide"})
    }
    
    development.query("DELETE FROM users WHERE id = ?", idUser ,(err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Voici les informations de l'utilisateurs"})
        }
    })
}

export function updateOneUsers (req: any, res: any){

    const idUser: string|number = req.params.idUser

    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({message: "ID non valide"})
    }

    const pseudo: string = req.body.pseudo;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const confirmPassword: string = req.body.confirmPassword

    

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Mot de passe différent."})
    }

    if (!RegexCharacter.test(password) || !RegexCharacter.test(confirmPassword) || !RegexCharacter.test(pseudo)){
        return res.status(400).json({message:"Des caractères invalides se trouve dans des champs."})
    }
    

    let salt = bcryptjs.genSaltSync(8)
    let hashedPassword: string = bcryptjs.hashSync(password, salt)
    
    development.query(`UPDATE users SET pseudo = '${pseudo}', email = '${email}', password = '${hashedPassword}' WHERE id = ${typeof(idUser) === "number" ? idUser : parseInt(idUser)}`, (err: any, result: any) => {
        if (err) {
            console.log(err)
        } else {
            return res.status(200).json({message: "Informations de l'utilisateurs modifier"})
        }
    })
}