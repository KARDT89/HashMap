class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.capacity = capacity;
        this.bucket = new Array(this.capacity).fill(null);
        this.load_factor = load_factor;
        this.totalStoredKeys = 0;
        this._rehashing = false;
    }

    // Generate an index in the bucket for a given key
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Add or update a key-value pair
    set(key, value) {
        let bucketIndex = this.hash(key);

        if (this.bucket[bucketIndex] === null) {
            this.bucket[bucketIndex] = [[`${key}`, value]];
            this.totalStoredKeys++;
            this.validate();
            return `Successfully Added -> [${key}: ${value}]`;
        } else {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i][0];
                if (bucketKey === key) {
                    this.bucket[bucketIndex][i][1] = value;
                    return `Successfully Replaced to -> [${key}: ${value}]`;
                }
            }
            this.bucket[bucketIndex].push([`${key}`, value]);
        }
        this.totalStoredKeys++;
        this.validate();
        return `Successfully Added -> [${key}: ${value}]`;
    }

    // Retrieve a value for a given key
    get(key) {
        const bucketIndex = this.hash(key);
        if (this.bucket[bucketIndex]) {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i][0];
                if (bucketKey === key) {
                    return this.bucket[bucketIndex][i];
                }
            }
        }
        return null;
    }

    // Check if a key exists
    has(key) {
        const bucketIndex = this.hash(key);
        if (this.bucket[bucketIndex]) {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i][0];
                if (bucketKey === key) {
                    return true;
                }
            }
        }
        return false;
    }

    // Remove a key-value pair
    remove(key) {
        const bucketIndex = this.hash(key);
        if (this.bucket[bucketIndex]) {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i][0];
                if (bucketKey === key) {
                    if (bucketIndexLength === 1) {
                        this.bucket[bucketIndex] = null;
                    } else {
                        this.bucket[bucketIndex].splice(i, 1);
                    }
                    this.totalStoredKeys--;
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    }

    // Return the total number of keys stored
    length() {
        return this.totalStoredKeys;
    }

    // Clear all entries from the map
    clear() {
        this.bucket = new Array(this.capacity).fill(null);
        this.totalStoredKeys = 0;
        return "Successfully Removed All Entries";
    }

    // Return all keys in the map
    keys() {
        let result = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) {
                for (let j = 0; j < this.bucket[i].length; j++) {
                    result.push(this.bucket[i][j][0]);
                }
            }
        }
        return result;
    }

    // Return all values in the map
    values() {
        let result = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) {
                for (let j = 0; j < this.bucket[i].length; j++) {
                    result.push(this.bucket[i][j][1]);
                }
            }
        }
        return result;
    }
    // Return all entries (key-value pairs)
    entries() {
        let result = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) {
                for (let j = 0; j < this.bucket[i].length; j++) {
                    result.push(this.bucket[i][j]);
                }
            }
        }
        return result;
    }

    // Resize the map if load factor is exceeded
    validate() {
        if (this._rehashing) return; // break the infinite loop

        let newCapacity = 16;
        while (true) {
            if (this.totalStoredKeys / newCapacity <= this.load_factor) {
                this.capacity = newCapacity;
                break;
            }
            newCapacity *= 2;
        }
        if (newCapacity !== this.capacity) {
            this.capacity = newCapacity;
            this._rehashing = true;
            this.reHash();
            this._rehashing = false;
        }
    }
    // Rebuild the entire hash map when resized
    reHash() {
        const entries = this.entries();
        this.bucket = new Array(this.capacity).fill(null);
        this.totalStoredKeys = 0;

        for (let [key, value] of entries) {
            this.set(key, value);
        }
    }
}


