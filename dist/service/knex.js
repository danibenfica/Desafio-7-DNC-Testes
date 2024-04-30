"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var knex_2 = require("../config/knex");
var conn;
function conectar() {
    if (conn) {
        return conn;
    }
    conn = (0, knex_1.default)(knex_2.default);
    return conn;
}
exports.default = conectar();
