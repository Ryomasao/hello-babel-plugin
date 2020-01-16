const babylon = require("babylon");
const log = require("babel-log");
//const { transform } = require("@babel/core");

const src = "1 + 2 + 3";

const plugins = () => {
  return {
    visitor: {
      ImportDeclaration: function(path, state) {
        //console.log("path", path);
        console.log("state", state.opts);
      }
    }
  };
};

//const { code } = transform(src, { plugins: [plugins] });

const ast = babylon.parse(src);

const isNode = obj => {
  // Node もしくは Node の配列は必ず object 型です。
  if (typeof obj !== "object") {
    return false;
  }

  // 配列の中に Node が含まれていれば、配列自体を Node 型と判定します。
  if (Array.isArray(obj)) {
    return obj.find(v => isNode(v)) !== undefined;
  }

  return obj && "constructor" in obj && obj.constructor.name === "Node";
};

const replacer = (key, value) => {
  if (!key || key === "type" || isNode(value)) {
    return value;
  }

  return undefined;
};

//const json = JSON.stringify(ast, replacer, " ");

const getCode = node => src.substr(node.start, node.end - node.start);

const traverser = (node, exitVistor, indent = 0, key = "top") => {
  console.log(
    `${" ".repeat(indent)}key: ${key} enter: ${node.type} '${getCode(node)}'`
  );

  const res = {};

  Object.keys(node).forEach(key => {
    if (!isNode(node[key])) return;

    if (Array.isArray(node[key])) {
      res[key] = node[key].map(v => traverser(v, exitVistor, indent + 2, key));
    } else {
      res[key] = traverser(node[key], exitVistor, indent + 2, key);
    }
  });

  console.log(
    `${" ".repeat(indent)}key: ${key} exit: ${node.type} '${getCode(node)}'`
  );
  return exitVistor[node.type](node, res, indent);
};

const exitVistor = {
  File: (node, res) => {
    res.program;
  },
  Program: (node, res) => {
    res.body;
  },
  ExpressionStatement: (node, res) => {
    const expr = node.expression;
    //return `${getCode(node)} = ${res.expression}`;
  },
  BinaryExpression: (node, res, indent) => {
    const { left, right } = res;
    return left + right;
  },
  NumericLiteral: (node, res, indent) => {
    return node.value;
  }
};

traverser(ast, exitVistor, 0);
