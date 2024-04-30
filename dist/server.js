"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var aluno_route_1 = require("./src/module/aluno/aluno.route");
var app = express();
app.use(express.json());
app.use('/aluno', aluno_route_1.default);
app.listen(8080, function () {
    console.log('server running!');
});
