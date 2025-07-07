import { HashSet } from "./HashSet.js";
import { HashMap } from "./HashMap.js";


const map = new HashMap();

// Add key-value pairs
map.set('name', 'John Doe');
map.set('age', 30);
map.set('city', 'New York');

// Retrieve values
console.log(map.get('name')); // ['name', 'John Doe']

// Check if key exists
console.log(map.has('age')); // true

// Get all keys, values, or entries
console.log(map.keys());    // ['name', 'age', 'city']
console.log(map.values());  // ['John Doe', 30, 'New York']
console.log(map.entries()); // [['name', 'John Doe'], ['age', 30], ['city', 'New York']]

// Remove a key-value pair
map.remove('age');

// Get map size
console.log(map.length()); // 2

// Clear all entries
map.clear();

// Create a new HashSet
const set = new HashSet();

// Add values
set.set('apple');
set.set('banana');
set.set('orange');

// Check if value exists
console.log(set.has('apple')); // true

// Get all entries
console.log(set.entries()); // ['apple', 'banana', 'orange']

// Remove a value
set.remove('banana');

// Get set size
console.log(set.length()); // 2

// Clear all entries
set.clear();