const { transform } = require("@babel/core");
const { parseExpression } = require("@babel/parser");
const src = "var a, b";

const plugin = babel => {
  //https://babeljs.io/docs/en/babel-types
  // isXXXでnodeのタイプを判断できる。
  // visitorパターンでnodeのタイプごとの関数を書いてるから、関数内でもっかいtypeを判定する意図があんまりわからない
  // → 処理単位が違うものがあるからだ
  //   変数の場合、以下の構造になってる
  //   VariableDeclaration
  //    declarations: [ VariableDeclarator ]
  //   このとき、 VariableDeclarator内の値もNode型(NumericLiteral)であるんだけど
  //   visitorの再起処理の流れにはのってこない
  //
  const { types: t } = babel;
  return {
    visitor: {
      VariableDeclaration: nodePath => {
        if (nodePath.node.kind === "var") {
          nodePath.node.kind = "const";
        }
      },
      VariableDeclarator: nodePath => {},
      BinaryExpression: nodePath => {}
    }
  };
};

const { code } = transform(src, { plugins: [plugin] });
// 変換後のコード
console.log(code);
