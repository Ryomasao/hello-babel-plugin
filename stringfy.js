// babylonでパースした内容をJSONで表示する練習

const babylon = require("babylon");
const isNode = require("./isNode.js");

const src = "1 + 2 - 3";

const replacer = (key, value) => {
  // JSON.stringfyのreplacerは返却したvalueがオブジェクトだと
  // 再帰的にreplacerを実行する
  // 一番最初のとき、keyは空になるので!keyを見る必要がある
  if (!key || key === "type" || isNode(value)) {
    return value;
  }

  // undefindeを返却すると、プロパティは消える
  return undefined;
};

// ASTをつくる
const ast = babylon.parse(src);
const json = JSON.stringify(ast, replacer, " ");
console.log(json);
