"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneRoles = exports.deleteOneRoles = exports.readOneRoles = exports.readAllRoles = exports.createRoles = void 0;
var dbconfig_1 = require("../config/dbconfig");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
var RegexColor = /#[a-zA-Z\d]{6,6}$/;
function createRoles(req, res) {
    var nameRole = req.body.nameRole;
    var colorRole = req.body.colorRole;
    if (!RegexCharacter.test(nameRole) || !RegexColor.test(colorRole)) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("INSERT INTO roles SET ?", { nameRole: nameRole, colorRole: colorRole }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Votre roles à été creer ave succès." });
        }
    });
}
exports.createRoles = createRoles;
function readAllRoles(req, res) {
    dbconfig_1.development.query("SELECT nameRole, colorRole FROM roles", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les roles", allRoles: result });
        }
    });
}
exports.readAllRoles = readAllRoles;
function readOneRoles(req, res) {
    var idRole = req.params.idRole;
    if (!RegexNumber.test(idRole.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("SELECT nameRole, colorRole FROM roles WHERE id = ?", req.params.idRole, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations du roles", result: result });
        }
    });
}
exports.readOneRoles = readOneRoles;
function deleteOneRoles(req, res) {
    var idRole = req.params.idRole;
    if (!RegexNumber.test(idRole.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("DELETE FROM roles WHERE id = ?", idRole, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations de l'utilisateurs" });
        }
    });
}
exports.deleteOneRoles = deleteOneRoles;
function updateOneRoles(req, res) {
    var idRole = req.params.idRole;
    if (!RegexNumber.test(idRole.toString())) {
        return res.status(400).json({ message: "Des caractères invalides ont été retrouvé." });
    }
    dbconfig_1.development.query("UPDATE FROM roles WHERE id = ?", idRole, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations de l'utilisateurs" });
        }
    });
}
exports.updateOneRoles = updateOneRoles;
