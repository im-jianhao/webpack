export default function printMe() {
  console.log("Updating      print.js");
}

Function.prototype.myCall = function (context, ...arg) {
  context = context || window;
  context.fn = this;
  const ret = context.fn(...arg);
  delete context.fn;
  return ret;
};
