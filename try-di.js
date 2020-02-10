const { transform } = require("@babel/core");

//const replaceVarToConst = require("./plugins/replaceVarToConst");
//const src = "var a, b";
//const plugin = replaceVarToConst;

//const di01 = require("./plugins/di_01");
//const src = "const hoge = require('data')";
//const plugin = di01;

const di02 = require("./plugins/di_02").default;
const di02_re = require("./plugins/di_02").re;

const src = `
function tom(){
  return 2
}
function jerry(){
  return 2
}
`;
const options = {
  //replace: {}
};
const plugin = di02;

const { code } = transform(src, {
  plugins: [
    // 適用させるプラグインを複数適用できる
    // 上から順に処理されてくんだね
    [plugin, options]
    //[(di02_re, options)]
  ]
});
// 変換後のコード
console.log(code);
