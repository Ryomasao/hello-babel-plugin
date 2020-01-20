// ASTをvistorパターンでtraverseする練習

const babylon = require("babylon");
const isNode = require("./isNode");

// トラバースしているNode型に対応するソースコードを表示するUtil
const getCode = node => src.substr(node.start, node.end - node.start);

// 再帰処理は魔法みたいだね

// 以下のコードをASTで書くとこんなかんじ
// src =  1 + 2 + 3
//
//                    File
//                   /
//                Program
//                 /
//             ExpressionStatement:[array]
//               /
//          BinaryExpression +
//              /          \
//     BinaryExpression:+    NumericLiteral:3
//       /         \
//  NumericLiteral:1  NumericLiteral:2
//
// こうやって考えると、以下はすんなり理解できる
// ・NumericLiteralにはvalueがあるはず
// ・BinaryExpressionにはopreatorがあるはず
//
const traverser = (node, exitVistor, indent = 0, key = "top") => {
  console.log(
    `${" ".repeat(indent)}key: ${key} enter: ${node.type} '${getCode(node)}'`
  );

  const res = {};

  //FileからNodeオブジェクトを辿っていく
  Object.keys(node).forEach(key => {
    // オブジェクトの子がNodeオブジェクトじゃないものはskip
    if (!isNode(node[key])) return;

    // ExpressionStatementはarrayでNodeをもつ
    if (Array.isArray(node[key])) {
      res[key] = node[key].map(v => traverser(v, exitVistor, indent + 2, key));
    } else {
      res[key] = traverser(node[key], exitVistor, indent + 2, key);
    }
  });

  console.log(
    `${" ".repeat(indent)}key: ${key} exit: ${node.type} '${getCode(node)}'`
  );

  // 再帰処理なので、最下層のNodeに対して処理を行い、上の階層のresオブジェクトに結果を格納していく
  return exitVistor[node.type](node, res, indent);
};

// この処理は一番下のNumerlicLiteralから上にコメント読んだ方が理解しやすい
const exitVistor = {
  File: (node, res) => {
    return res.program;
  },
  Program: (node, res) => {
    return res.body;
  },
  ExpressionStatement: (node, res) => {
    // BinaryExpressionは、leftとrightにNodeがぶら下がっていたけど
    // ExpressionStatementではexpressionプロパティに子ノードがぶらさがっている
    const expr = node.expression;
    return `${getCode(node)} = ${res.expression}`;
  },
  BinaryExpression: (node, res, indent) => {
    // ここはちょっとだけややこしい
    // BinaryExpressionのleftとrightプロパティに、それぞれNodeがぶら下がっている。
    // ほんで、traverseはオブジェクトのkeyをぶん回して、Node型があれば再帰処理してるよね。
    // その結果をres[key]に格納している。
    // なので、res[left]、res[right]には、NumericLiteralのvistor関数で処理した値、node.valueが入ってるんだ。
    const { left, right } = res;
    return left + right;
  },
  NumericLiteral: (node, res, indent) => {
    // 最下層の処理
    return node.value;
  }
};

const src = "1 + 2 - 3";
const ast = babylon.parse(src);
const results = traverser(ast, exitVistor, 0);
console.log("");
console.log(results);
