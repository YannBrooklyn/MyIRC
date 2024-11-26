"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneChannelsMsg = exports.deleteOneChannelsMsg = exports.readOneChannelsMsg = exports.readAllChannelsMsg = exports.createChannelsMsg = void 0;
var dbconfig_1 = require("../config/dbconfig");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
function createChannelsMsg(req, res) {
    var message = req.body.message;
    var idUser = req.body.idUser;
    var idChannel = req.body.idChannel;
    if (!RegexNumber.test(idUser.toString()) || !RegexNumber.test(idChannel.toString()) || !RegexCharacter.test(message)) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("INSERT INTO channelmessages SET ?", { message: message, idUser: idUser, idChannel: idChannel }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Votre message à été envoyer avec succès." });
        }
    });
}
exports.createChannelsMsg = createChannelsMsg;
function readAllChannelsMsg(req, res) {
    var idChannel = req.body.idChannel;
    if (!RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT channelmessages.message, channelmessages.idUser, channelmessages.idChannel, users.pseudo FROM channelmessages inner join users ON  channelmessages.idUser = users.id WHERE channelmessages.idChannel = ?", parseInt(req.body.idChannel), function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les messages des channels", allmessages: result });
        }
    });
}
exports.readAllChannelsMsg = readAllChannelsMsg;
function readOneChannelsMsg(req, res) {
    var idChnlMSG = req.params.idChnlMSG;
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT channelmessages.message, channelmessages.idChannel, channelmessages.idUser FROM channelmessages WHERE id = ?", idChnlMSG, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations du message", result: result });
        }
    });
}
exports.readOneChannelsMsg = readOneChannelsMsg;
function deleteOneChannelsMsg(req, res) {
    var idChnlMSG = req.params.idChnlMSG;
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("DELETE FROM channelmessages WHERE id = ?", idChnlMSG, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Message supprimer" });
        }
    });
}
exports.deleteOneChannelsMsg = deleteOneChannelsMsg;
function updateOneChannelsMsg(req, res) {
    var idChnlMSG = req.params.idChnlMSG;
    if (!RegexNumber.test(idChnlMSG.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("UPDATE FROM channelmessages WHERE id = ?", idChnlMSG, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Message modifier" });
        }
    });
}
exports.updateOneChannelsMsg = updateOneChannelsMsg;
