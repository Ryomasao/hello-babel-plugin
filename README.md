# 教科書

https://rabbit-house.tokyo/ast-book-sample.pdf

# 読み解きたいもの

https://github.com/zetachang/react-native-dotenv

### AST の木構造

![](out/uml/basic/tree.png)

### メモ

字句解析： トークナイズ  
構文解析： 構文木の作成

- `identifier`:識別子
- `leteral`:識別子

https://astexplorer.net/

visitor パターンの話で、出てくる第 1 級関数とは一体
https://ja.wikipedia.org/wiki/%E7%AC%AC%E4%B8%80%E7%B4%9A%E9%96%A2%E6%95%B0

`@babel/core`は、パーサー、トラバーサー、ジェネレーターを含んでいる。
それぞれ、エコシステムで別のパッケージとしても使うことができる。

`@babel/parser`:パーサー ※旧 babylon
`@babel/traverse`:トラバーサー
`@babel/generator`:　ジェネレーター
