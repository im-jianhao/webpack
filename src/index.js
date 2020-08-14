import "./1.less";
import "./index.css";
import "./3.ff";
import print from "./print";

function foo(...arg) {
  console.log(123);
  print();
  return arg.reduce((p, n) => (p = p + n), 0);
}
console.log(foo(1, 2, 3, 4));

if (module.hot) {
  module.hot.accept("./print.js", () => {
    console.log("Accepting the updated printMe module!");
    print();
  });
}
