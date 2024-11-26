"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneUsers = exports.deleteOneUsers = exports.readOneUsers = exports.readAllUsers = exports.loginUsers = exports.createUsers = void 0;
var dbconfig_1 = require("../config/dbconfig");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var RegexCharacter = /[a-zA-Z\d\s]{5,13}$/;
var RegexNumber = /[\d]{1}$/;
var RegexEmail = /[A-Za-z\d.-]{1,}@[A-Za-z\d.-]{1,}\.[A-Za-z\d.-]$/;
function createUsers(req, res) {
    var pseudo = req.body.pseudo;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var email = req.body.email;
    dbconfig_1.development.query("SELECT * FROM users WHERE email = ?", email, function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result.length !== 0) {
            return res.status(400).json({ message: "Cette email est déjà enregistrer." });
        }
        else {
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Mot de passe différent." });
            }
            if (!RegexCharacter.test(password) || !RegexCharacter.test(confirmPassword) || !RegexCharacter.test(pseudo)) {
                return res.status(400).json({ message: "Des caractères invalides se trouve dans des champs." });
            }
            var salt = bcryptjs.genSaltSync(8);
            var hashedPassword = bcryptjs.hashSync(password, salt);
            dbconfig_1.development.query("INSERT INTO users SET ?", { pseudo: pseudo, email: email, password: hashedPassword, idRole: 3 }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    return res.status(200).json({ message: "Votre compte à été creer avec succès." });
                }
            });
        }
    });
}
exports.createUsers = createUsers;
function loginUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var pseudo, password, email;
        return __generator(this, function (_a) {
            pseudo = req.body.pseudo;
            password = req.body.password;
            email = req.body.email;
            if (!RegexCharacter.test(password) || !RegexCharacter.test(pseudo)) {
                return [2 /*return*/, res.status(400).json({ message: "Des caractères invalides se trouve dans des champs." })];
            }
            dbconfig_1.development.query("SELECT * FROM users WHERE email = ?", email, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else if (result.length === 0) {
                    return res.status(400).json({ message: "Email non reconnu." });
                }
                else if (result.length !== 0) {
                    var verifyPassword = bcryptjs.compareSync(password, result[0].password);
                    if (verifyPassword === true) {
                        var token = jwt.sign({ id: result[0].id }, 'waza');
                        return res.status(200).json({ message: "Connecté", token: token });
                    }
                    else {
                        return res.status(400).json({ message: "Wrong password." });
                    }
                }
                else {
                    return res.status(500).json({ message: "Une erreur s'est produite." });
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.loginUsers = loginUsers;
function readAllUsers(req, res) {
    dbconfig_1.development.query("SELECT id, pseudo, email FROM users", function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici tout les utilisateurs", users: result });
        }
    });
}
exports.readAllUsers = readAllUsers;
function readOneUsers(req, res) {
    var idUser = req.params.idUser;
    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({ message: "ID non valide" });
    }
    dbconfig_1.development.query("SELECT users.pseudo, users.email, channels.nameChannel , channelmessages.message FROM users inner join channelmessages on users.id = channelmessages.idUser inner join channels on channelmessages.idChannel = channels.id WHERE users.id = ?", idUser, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations de l'utilisateurs", result: result });
        }
    });
}
exports.readOneUsers = readOneUsers;
function deleteOneUsers(req, res) {
    var idUser = req.params.idUser;
    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({ message: "ID non valide" });
    }
    dbconfig_1.development.query("DELETE FROM users WHERE id = ?", idUser, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Voici les informations de l'utilisateurs" });
        }
    });
}
exports.deleteOneUsers = deleteOneUsers;
function updateOneUsers(req, res) {
    var idUser = req.params.idUser;
    if (!RegexNumber.test(idUser.toString())) {
        return res.status(400).json({ message: "ID non valide" });
    }
    var pseudo = req.body.pseudo;
    var password = req.body.password;
    var email = req.body.email;
    var confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Mot de passe différent." });
    }
    if (!RegexCharacter.test(password) || !RegexCharacter.test(confirmPassword) || !RegexCharacter.test(pseudo)) {
        return res.status(400).json({ message: "Des caractères invalides se trouve dans des champs." });
    }
    var salt = bcryptjs.genSaltSync(8);
    var hashedPassword = bcryptjs.hashSync(password, salt);
    dbconfig_1.development.query("UPDATE users SET pseudo = '".concat(pseudo, "', email = '").concat(email, "', password = '").concat(hashedPassword, "' WHERE id = ").concat(typeof (idUser) === "number" ? idUser : parseInt(idUser)), function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            return res.status(200).json({ message: "Informations de l'utilisateurs modifier" });
        }
    });
}
exports.updateOneUsers = updateOneUsers;
