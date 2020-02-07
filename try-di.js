const { transform } = require("@babel/core");
const { parseExpression } = require("@babel/parser");

const replaceVarToConst = require("./plugins/replaceVarToConst");

const src = "var a, b";

const plugin = replaceVarToConst;

const { code } = transform(src, { plugins: [plugin] });
// 変換後のコード
console.log(code);
