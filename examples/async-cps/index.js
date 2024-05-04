/* The additionAsync function is asynchronous because setTimeout adds a task to the event queue that is 
executed only after 100 milliseconds. This is an asynchronous operation, therefore the function will not wait 
for the callback to complete its execution. Instead, it will return immediately giving control back to additionAsync 
and then to the event loop, thus allowing a new event from the queue to be processed.
 */
function additionAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 100);
}

console.log("before");
additionAsync(1, 2, (result) => console.log("Result: " + result));
console.log("after");

// Output:
// before
// after
// Result: 3
