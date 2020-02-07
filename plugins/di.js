module.exports = babel => {
  const { parseExpression } = require("@babel/parser");
  const { types: t } = babel;
  return {
    visitor: {
      VariableDeclaration: nodePath => {},
      VariableDeclarator: nodePath => {
        const { node } = nodePath;

        // Declaratorには、idっていうpropertyがあって、変数名っぽい
        // idにはまたIdentifier型のNodeがあって、nameをもってる。
        // https://babeljs.io/docs/en/babel-types
        // ※VariableDeclarator→Identifierの紐づけが上記docからどうやって読み取るのかわからない
        if (t.isIdentifier(node.id) && node.id.name === "hoge") {
          const newAst = parseExpression("require('dummy-data')");

          // やってることは、以下と同じ。
          // VariableDeclaratorのinit propertyには変数宣言時に設定する初期値が設定されている
          //node.init = newAst;
          nodePath.get("init").replaceWith(newAst);
        }
      },
      BinaryExpression: nodePath => {}
    }
  };
};
