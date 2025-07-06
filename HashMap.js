class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.capacity = capacity;
        this.bucket = new Array(this.capacity).fill(null);
        this.load_factor = load_factor;
        this.totalStoredKeys = 0;
    }

    // recieve bucket index
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        let bucketIndex = this.hash(key);

        if (this.bucket[bucketIndex] === null) {
            this.bucket[bucketIndex] = [[`${key}`, value]];
            this.totalStoredKeys++;
            this.validate()
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
        this.validate()
        return `Successfully Added -> [${key}: ${value}]`;
    }

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
                    this.validate()
                    return true;
                }
            }
        }
        return false;
    }

    length() {
        return this.totalStoredKeys;
    }

    clear() {
        this.bucket = new Array(this.capacity).fill(null);
        this.load_factor = 0;
        this.totalStoredKeys = 0;
        return "Successfully Removed All Entries";
    }

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

    validate() {
        if (this.totalStoredKeys / this.capacity > this.load_factor) {
            this.capacity *= 2;
            this.reHash()
        } 
        // todo make it dynamic
    }
    reHash() {
        const entries = this.entries();
        this.bucket = new Array(this.capacity).fill(null);
        this.totalStoredKeys = 0;
        for (let [key, value] of entries) {
            this.set(key, value);
        }
    }
}

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("lion2", "golden");


console.log(test.remove("elephant"));
console.log(test.capacity);
