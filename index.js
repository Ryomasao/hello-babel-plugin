const { transform } = require("@babel/core");

const src = `
import hoge from 'fuga'
`;

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

const { code } = transform(src, { plugins: [plugins] });
