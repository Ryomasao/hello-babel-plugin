const { transform } = require("@babel/core");

//const replaceVarToConst = require("./plugins/replaceVarToConst");
//const src = "var a, b";
//const plugin = replaceVarToConst;

//const di01 = require("./plugins/di_01");
//const src = "const hoge = require('data')";
//const plugin = di01;

const di02 = require("./plugins/di_02");
const src = `
function tom(){
  return 2
}
function jerry(){
  return 2
}
`;
const plugin = di02;

const { code } = transform(src, { plugins: [plugin] });
// 変換後のコード
console.log(code);
