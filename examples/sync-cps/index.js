/* Direct Passing Style */
function add(a, b) {
  return a + b;
}

/* Continuation Passing Style */
function addCps(a, b, callback) {
  callback(a + b);
}

console.log("before");
addCps(1, 2, (result) => console.log(`Result: ${result}`));
console.log("after");
