
# HashMap & HashSet Implementation

A lightweight, pure JavaScript implementation of HashMap and HashSet data structures with automatic resizing and collision handling using separate chaining.

## Features

- **HashMap**: Key-value storage with O(1) average time complexity
- **HashSet**: Unique value storage with O(1) average time complexity
- **Automatic Resizing**: Dynamic capacity expansion when load factor exceeds 0.75
- **Collision Handling**: Separate chaining for hash collision resolution
- **Memory Efficient**: Only stores actual data without unnecessary overhead

## Installation

```bash
# Clone the repository
git clone https://github.com/KARDT89/HashMap.git
cd hashmap

# If using as ES6 modules
import { HashMap, HashSet } from './your-file.js';
```

## Usage

### HashMap

```javascript
import { HashMap } from './hashmap.js';

// Create a new HashMap
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
```

### HashSet

```javascript
import { HashSet } from './hashmap.js';

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
```

## API Reference

### HashMap

#### Constructor
- `new HashMap(capacity = 16, load_factor = 0.75)`

#### Methods
- `set(key, value)` - Add or update a key-value pair
- `get(key)` - Retrieve value for a given key (returns `[key, value]` or `null`)
- `has(key)` - Check if key exists (returns `boolean`)
- `remove(key)` - Remove a key-value pair (returns `boolean`)
- `length()` - Get total number of stored keys
- `clear()` - Remove all entries
- `keys()` - Get array of all keys
- `values()` - Get array of all values
- `entries()` - Get array of all key-value pairs

### HashSet

#### Constructor
- `new HashSet(capacity = 16, load_factor = 0.75)`

#### Methods
- `set(key)` - Add a value to the set
- `has(key)` - Check if value exists (returns `boolean`)
- `remove(key)` - Remove a value (returns `boolean`)
- `length()` - Get total number of stored values
- `clear()` - Remove all entries
- `entries()` - Get array of all values

## Performance

- **Average Case**: O(1) for all operations
- **Worst Case**: O(n) when many collisions occur
- **Space Complexity**: O(n) where n is the number of stored elements

## Hash Function

Uses a polynomial rolling hash function with prime number 31:
```javascript
hash = (31 * hash + charCode) % capacity
```

## Load Factor & Resizing

- Default load factor: 0.75
- Automatic resizing when load factor is exceeded
- Capacity doubles during resize operations
- All entries are rehashed during resize

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- This project was built as part of my learning journey through The Odin Project.
  Huge thanks to the community and curriculum for making computer science fundamentals approachable and fun.
- Built for educational purposes and practical use
- Follows JavaScript ES6+ standards