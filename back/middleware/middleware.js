"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
var jwt = require("jsonwebtoken");
var middleware = function (req, res, nex) {
    var token = req.body.token;
    var regexToken = /^([A-Za-zËÊÈéèêëÄÂÀÃãàâäÎÏÌîïìÜÛÙùüûÖÔÒôöõòÿ!_.'?\d\s-]){2,}$/;
    if (!regexToken.test(token)) {
        return res.status(400).json({ message: "Le token contient des caractères invalides." });
    }
    jwt.verify(token, 'waza', function (err, dec) {
        if (err) {
            return res.status(400).json({ message: "Token invalide." });
        }
        else {
            nex();
        }
    });
};
exports.middleware = middleware;
