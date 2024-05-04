/* Direct Passing Style */
function add(a, b) {
  return a + b;
}

/* Continuation Passing Style */
/* The addCps function is synchronous because it will complete it's execution only when the callback completes its execution too */
function addCps(a, b, callback) {
  callback(a + b);
}

console.log("before");
addCps(1, 2, (result) => console.log(`Result: ${result}`));
console.log("after");

// Output:
// before
// Result: 3
// after
