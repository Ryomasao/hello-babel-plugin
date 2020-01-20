//https://babeljs.io/docs/en/babel-parser
const parser = require("@babel/parser");
//https://babeljs.io/docs/en/babel-traverse
const traverse = require("@babel/traverse").default;

const src = "1+1";
const ast = parser.parse(src);

const vistor = {
  // enter・exitはすべてのNodeに対して実行される
  // babelプラグインとしては、これは使わないとのこと。
  enter(nodePath) {
    console.log("enter");
  },
  exit(nodePath) {
    console.log("exit");
  },
  // また個別のノードにたいして実行する場合は、このようにかける
  // File・Programにに対して定義してみたけど、こちらは実行されなかった。
  ExpressionStatement: {
    // オブジェクトの中にenter・exitの関数を置ける
    enter(nodePath) {
      console.log("enter", "ExpressionStatement");
    },
    exit(nodePath) {
      console.log("exit", "ExpressionStatement");
    }
  },
  // 関数を直接定義すると、これはenter扱いになる
  BinaryExpression: nodePath => {
    console.log("Binary");
    //console.log(nodePath.node);
  },
  NumericLiteral: nodePath => {
    console.log("Numeric");
    //console.log(nodePath.node);
  }
};

traverse(ast, vistor);
