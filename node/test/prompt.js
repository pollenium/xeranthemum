"use strict";
exports.__esModule = true;
var __1 = require("../");
__1.promptPrivateKey().then(function (privateKey) {
    console.log(privateKey.uu.toHex());
});
