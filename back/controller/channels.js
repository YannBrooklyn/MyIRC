"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneChannels = exports.deleteOneChannels = exports.readOneChannels = exports.readAllChannels = exports.createChannels = void 0;
var dbconfig_1 = require("../config/dbconfig");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
function createChannels(req, res) {
    var nameChannel = req.body.nameChannel;
    if (!RegexCharacter.test(nameChannel)) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("INSERT INTO channels SET ?", { nameChannel: nameChannel }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Votre channel à été creer avec succès." });
        }
    });
}
exports.createChannels = createChannels;
function readAllChannels(req, res) {
    dbconfig_1.development.query("SELECT id, nameChannel FROM channels", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les channels", channels: result });
        }
    });
}
exports.readAllChannels = readAllChannels;
function readOneChannels(req, res) {
    var idChannel = req.params.idChannel;
    if (!RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT nameChannel FROM channels WHERE id = ?", idChannel, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations du channel privée" });
        }
    });
}
exports.readOneChannels = readOneChannels;
function deleteOneChannels(req, res) {
    var idChannel = req.params.idChannel;
    if (!RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("DELETE FROM channels WHERE id = ?", idChannel, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "channel supprimer" });
        }
    });
}
exports.deleteOneChannels = deleteOneChannels;
function updateOneChannels(req, res) {
    var idChannel = req.params.idChannel;
    if (!RegexNumber.test(idChannel.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("UPDATE FROM channels WHERE id = ?", idChannel, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "channel privée modifier" });
        }
    });
}
exports.updateOneChannels = updateOneChannels;
