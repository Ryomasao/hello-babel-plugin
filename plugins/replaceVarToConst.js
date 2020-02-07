//https://nodejs.org/api/modules.html#modules_the_module_object
module.exports = babel => {
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
          // 直接書き換える
          nodePath.node.kind = "const";
        }
      },
      VariableDeclarator: nodePath => {},
      BinaryExpression: nodePath => {}
    }
  };
};
