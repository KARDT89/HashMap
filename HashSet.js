export class HashSet {
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

    set(key) {
        let bucketIndex = this.hash(key);

        // check if bucket is empty
        if (this.bucket[bucketIndex] === null) {
            this.bucket[bucketIndex] = [key];
            this.totalStoredKeys++;
            //validate
            this.validate();
            return `Successfully Added -> [${key}]`;
        } else {
            // check if the key stored is the same as key given then replace else append
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i];
                // same as the key
                if (bucketKey === key) {
                    this.bucket[bucketIndex][i] = key;
                    return `Successfully Replaced to -> [${key}]`;
                }
            }
            // not the same
            this.bucket[bucketIndex].push(key);
        }
        this.totalStoredKeys++;
        //validate
        this.validate();
        return `Successfully Added -> [${key}]`;
    }
    // Retrieve a value for a given key
    has(key) {
        const bucketIndex = this.hash(key);
        //if the bucket is not empty
        if (this.bucket[bucketIndex]) {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i];
                if (bucketKey === key) {
                    return true;
                }
            }
        }
        return false;
    }
    remove(key) {
        const bucketIndex = this.hash(key);
        //if the bucket is not empty
        if (this.bucket[bucketIndex]) {
            const bucketIndexLength = this.bucket[bucketIndex].length;
            for (let i = 0; i < bucketIndexLength; i++) {
                const bucketKey = this.bucket[bucketIndex][i];
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
    // delete all entries
    clear() {
        this.bucket = new Array(this.capacity).fill(null);
        this.totalStoredKeys = 0;
        this.validate();
        return "Successfully Removed All Entries";
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
        if (this._rehashing) return;

        let newCapacity = this.capacity;
        while (this.totalStoredKeys / newCapacity > this.load_factor) {
            newCapacity *= 2;
        }

        if (newCapacity !== this.capacity) {
            this._rehashing = true;
            this.capacity = newCapacity;
            this.reHash();
            this._rehashing = false;
        }
    }

    // Rebuild the entire hash map when resized
    reHash() {
        const entries = this.entries();
        this.bucket = new Array(this.capacity).fill(null);
        this.totalStoredKeys = 0;

        for (let key of entries) {
            this.set(key);
        }
    }
}
