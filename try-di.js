const { transform } = require("@babel/core");

//const replaceVarToConst = require("./plugins/replaceVarToConst");
//const src = "var a, b";
//const plugin = replaceVarToConst;

const di = require("./plugins/di");
const src = "const hoge = require('data')";
const plugin = di;

const { code } = transform(src, { plugins: [plugin] });
// 変換後のコード
console.log(code);
