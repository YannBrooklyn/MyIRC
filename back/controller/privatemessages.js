"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnePVMessages = exports.deleteOnePVMessages = exports.readOnePVMessages = exports.readAllPVMessages = exports.createPVMessages = void 0;
var dbconfig_1 = require("../config/dbconfig");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
function createPVMessages(req, res) {
    var message = req.body.message;
    var idUser = req.body.idUser;
    var idPrivate = req.body.idChannel;
    if (!RegexNumber.test(idUser.toString()) || !RegexNumber.test(idPrivate.toString()) || !RegexCharacter.test(message)) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("INSERT INTO privatemessages SET ?", { message: message, idUser: idUser, idPrivate: idPrivate }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Votre message à été envoyer avec succès." });
        }
    });
}
exports.createPVMessages = createPVMessages;
function readAllPVMessages(req, res) {
    dbconfig_1.development.query("SELECT message, idUser, idPrivate FROM privatemessages", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les messages privées", allMessage: result });
        }
    });
}
exports.readAllPVMessages = readAllPVMessages;
function readOnePVMessages(req, res) {
    var idPVMsg = req.params.idPVMsg;
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT message, idUser, idPrivate FROM privatemessages WHERE id = ?", idPVMsg, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations du message", result: result });
        }
    });
}
exports.readOnePVMessages = readOnePVMessages;
function deleteOnePVMessages(req, res) {
    var idPVMsg = req.params.idPVMsg;
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("DELETE FROM privatemessages WHERE id = ?", idPVMsg, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Message privée supprimer" });
        }
    });
}
exports.deleteOnePVMessages = deleteOnePVMessages;
function updateOnePVMessages(req, res) {
    var idPVMsg = req.params.idPVMsg;
    if (!RegexNumber.test(idPVMsg.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("UPDATE FROM privatemessages WHERE id = ?", idPVMsg, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Message privée modifier" });
        }
    });
}
exports.updateOnePVMessages = updateOnePVMessages;
