// 以下を行うプラグイン
// before
//  function tom() {  }
// after
//  function hoge() { return 2 }
// ※ return値をかえるのではなく関数定義そのものを置き換える

exports.default = babel => {
  // parseExpressionは、その名の通り式のみをparseできる
  // https://babeljs.io/docs/en/babel-parser#babelparserparseexpressioncode-options
  const { parseExpression, parse } = require("@babel/parser");
  const { types: t, traverse, template } = babel;

  // Symbolを使うと既存のオブジェクトに安全にプロパティを追加することができる！
  // https://qiita.com/naruto/items/312adeb6145eb6221be7
  const WasReplaced = Symbol("WasReplaced");

  return {
    visitor: {
      FunctionDeclaration: (nodePath, state) => {
        // pluginのオプションは第二引数で取得できる
        //console.log(state.opts);

        // これはNG。var a = 1はExpressionじゃなくってStatement
        //const newAst = parseExpression("var a = 1");
        // parse使えばいける
        //const newAst = parse("var a = 1");

        // replaceWithはすごい！
        // というのもreplace後のNodeにもっかいvisitorパターンが適用される
        // なので、ここで関数を丸っと置き換えると、置き換え後の関数についても、FunctionDeclarationに入ってくる
        // 置き換え後に再度置き換え処理をやると無限loopしちゃうので、これは置き換え後だよ！って区別する必要があるんだ
        if (nodePath[WasReplaced] || !t.isIdentifier(nodePath.node.id)) return;

        if (nodePath.node.id.name === "tom") {
          const src = "function hoge(){return 2}";
          const newAstByTemplate = template(src)();

          //let FunctionNode = null;
          //const newAst = parse(src);
          //traverse(newAst, {
          //  FunctionDeclaration: nodePath => {
          //    FunctionNode = nodePath.node;
          //  }
          //});
          //nodePath.replaceWith(FunctionNode);

          nodePath.replaceWith(newAstByTemplate);
          nodePath[WasReplaced] = true;
        }
      }
    }
  };
};

// ↑のプラグインを元に戻すためのプラグイン
exports.re = babel => {
  const { types: t, template } = babel;
  const WasReplaced = Symbol("WasReplaced");

  return {
    visitor: {
      FunctionDeclaration: nodePath => {
        if (nodePath[WasReplaced] || !t.isIdentifier(nodePath.node.id)) return;
        if (nodePath.node.id.name === "hoge") {
          const src = "function reChange(){return 2}";
          const newAstByTemplate = template(src)();
          nodePath.replaceWith(newAstByTemplate);
          nodePath[WasReplaced] = true;
        }
      }
    }
  };
};
