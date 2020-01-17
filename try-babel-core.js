const { transform } = require("@babel/core");

const sourceCode = "1+2";

// transformに渡す関数のオプション
//https://babeljs.io/docs/en/next/options
const opts = { ast: true, sourceMaps: "inline" };

const { code, ast, map } = transform(sourceCode, opts);

// 変換後のコード
console.log(code);

// 変換後のast
console.log(ast);

// ソースマップ
console.log(map);
