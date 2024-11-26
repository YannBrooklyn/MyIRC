"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnePrivates = exports.deleteOnePrivates = exports.readOnePrivates = exports.readAllPrivates = exports.createPrivates = void 0;
var dbconfig_1 = require("../config/dbconfig");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
function createPrivates(req, res) {
    var namePrivate = req.body.namePrivate;
    if (!RegexCharacter.test(namePrivate)) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("INSERT INTO privates SET ?", { namePrivate: namePrivate }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Votre salon privée à été creer avec succès." });
        }
    });
}
exports.createPrivates = createPrivates;
function readAllPrivates(req, res) {
    dbconfig_1.development.query("SELECT nameprivate FROM privates", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les salons privée" });
        }
    });
}
exports.readAllPrivates = readAllPrivates;
function readOnePrivates(req, res) {
    var idPrivate = req.params.idPrivate;
    if (!RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT nameprivate FROM privates WHERE id = ?", idPrivate, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations du salon privée" });
        }
    });
}
exports.readOnePrivates = readOnePrivates;
function deleteOnePrivates(req, res) {
    var idPrivate = req.params.idPrivate;
    if (!RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("DELETE FROM privates WHERE id = ?", idPrivate, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Salon privée supprimer" });
        }
    });
}
exports.deleteOnePrivates = deleteOnePrivates;
function updateOnePrivates(req, res) {
    var idPrivate = req.params.idPrivate;
    if (!RegexNumber.test(idPrivate.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("UPDATE FROM privates WHERE id = ?", idPrivate, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Salon privée modifier" });
        }
    });
}
exports.updateOnePrivates = updateOnePrivates;
