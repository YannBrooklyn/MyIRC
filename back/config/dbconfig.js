"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
var mysql = require("mysql2");
exports.development = mysql.createConnection({
    user: "root",
    password: "",
    database: "ircproject",
    host: "localhost",
    port: 3406,
});
exports.development.connect(function (error) {
    if (error) {
        console.error('An error as occured', error);
    }
    else {
        console.log("connected");
    }
});
