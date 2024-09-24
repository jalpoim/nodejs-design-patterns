import { readFile } from "fs";

const cache = new Map();

/* One of the most dangerous situations is having an API which behaves synchronously under certain situations
and asynchronously under others. It behaves asynchronously until the file is read for the first time and the cache is set
and after that it behaves synchronously for all the subsequent requests */
function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // asynchronous function
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader1 = createFileReader("data.txt");
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader("data.txt");
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`);
  });
});

// Output:
// First call data: Hello, Node.js!

/* The callback of the second reader is never invoked.
During the creation of reader1, the inconsistentRead() function behaves asynchronously because there is no cached result.
This means that any onDataReady listener will be invoked later in another cycle of the event loop, so we have all the time
we need to register our listener. 
reader2 is created in a cycle of the event loop in which the cache for the requested file is already set.
In this case, the inner call to inconsistentRead() will be synchronous and the listener will be invoked immediately, 
which means that all the listeners of reader2 will be invoked synchronously as well.
However, we are registering the listener after the creation of reader2, so the listener will never be invoked. */
