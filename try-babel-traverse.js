//https://babeljs.io/docs/en/babel-parser
const parser = require("@babel/parser");
//https://babeljs.io/docs/en/babel-traverse
const traverse = require("@babel/traverse").default;

const src = "1+1";
const ast = parser.parse(src);

const vistor = {
  BinaryExpression: nodePath => {
    console.log(nodePath.node);
  }
};

traverse(ast, vistor);
