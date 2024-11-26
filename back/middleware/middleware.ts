import * as jwt from "jsonwebtoken"

export const middleware = (req: any, res: any, nex: any) => {
    const token: string = req.body.token
    const regexToken = /^([A-Za-zËÊÈéèêëÄÂÀÃãàâäÎÏÌîïìÜÛÙùüûÖÔÒôöõòÿ!_.'?\d\s-]){2,}$/; 

    if (!regexToken.test(token)) {
        return res.status(400).json({message: "Le token contient des caractères invalides."})
    }
    jwt.verify(token, 'waza',  (err: any, dec: any) => {
        if (err) {
            console.log(token)
            return res.status(400).json({message: "Token invalide."})
        } else {
            nex()
        }
    })
}