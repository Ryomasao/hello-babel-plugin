const { transform } = require("@babel/core");

const src = "1+2";

// pluginはオブジェクトを返す関数か、オブジェクトそのものを渡すことができる
// 前者の方が、引数にbabelのbabel-traverseだったり、いろいろ便利なものが入っているのでおすすめとのこと
// 以下は前者の関数パターン
const plugin = babel => {
  //const { traverse } = babel;

  return {
    // traverseする前に実行する処理
    pre() {
      console.log("pre", this);
    },
    // 以下の書き方でもいいと思ったけど、上記でthisの設定した値は、visitor関数の第2引数にstateとしてセットされる。
    //pre: () => {
    //  console.log("pre", this);
    //},
    visitor: {
      BinaryExpression: nodePath => {
        // traverserを自分で作ったときは、引数にはシンプルにnodeそのもをの渡してた
        // babel本体では、nodePathっていうnodeをラップしているオブジェクトがあって
        // nodeのparentだったり、scopeだったり便利な情報がいっぱいつまってる
        console.log(nodePath.node.operator);
      }
    }
  };
};

const { code } = transform(src, { plugins: [plugin] });
