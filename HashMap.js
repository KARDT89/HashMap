class HashMap {
    constructor(capacity = 16, threshold = 0.75) {
        this.capacity = capacity;
        this.bucket = new Array(this.capacity).fill(null);
        this.load_factor = 0;
        this.threshold = threshold;
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
            this.load_factor++;
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
        this.load_factor++;
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

    checkLoadFactor() {
        let size = 0;
        for (let i = 0; i < this.capacity; i++) {
            if (this.bucket[i] !== null) {
                size += this.bucket[i].length;
            }
        }
        this.load_factor = size / this.capacity;
        if (this.load_factor > this.threshold) {
            this.capacity = this.capacity * 2;
            // todo after resize re-set all the values in their bucket
        }
    }
    reHash() {}
}

let test = new HashMap();

test.set("tac", 10);
test.set("cat", 20);
console.log(test.set("cat", 21));
// console.log(test.set("cat", "new val"))


console.log(test.get("cat"));
// console.log(test.get("sex"));
