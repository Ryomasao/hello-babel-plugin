const { transform } = require("@babel/core");

const src = "1 +2";

const plugin = obj => ({
  visitor: {
    BinaryExpression: nodePath => {
      // traverserを自分で作ったときは、引数にはシンプルにnodeそのもをの渡してた
      // babel本体では、nodePathっていうnodeをラップしているオブジェクトがあって
      // nodeのparentだったり、scopeだったり便利な情報がいっぱいつまってる
      console.log(nodePath);
    }
  }
});

const { code } = transform(src, { plugins: [plugin] });
