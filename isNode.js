// ASTのNode型のオブジェクトかどうかを判断する
const isNode = obj => {
  if (typeof obj !== "object") {
    return false;
  }

  if (Array.isArray(obj)) {
    return obj.find(v => isNode(v)) !== undefined;
  }

  return obj && "constructor" in obj && obj.constructor.name === "Node";
};

module.exports = isNode;
