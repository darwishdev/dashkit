class CacheNode<K, V> {
  key: K;
  value: V;
  next: CacheNode<K, V> | null;
  prev: CacheNode<K, V> | null;

  constructor(key: K, value: V, next: CacheNode<K, V> | null = null, prev: CacheNode<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export default class LRU<K, V> {
  private size: number;
  private limit: number;
  private head: CacheNode<K, V> | null;
  private tail: CacheNode<K, V> | null;
  private cacheMap: { [key: string]: CacheNode<K, V> };

  constructor(limit: number = 10) {
    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cacheMap = {};
  }


  readAllCache() {
    return this.cacheMap
  }
  write(key: K, value: V) {
    const existingCacheNode = this.cacheMap[key as unknown as string];
    if (existingCacheNode) {
      this.detach(existingCacheNode);
      this.size--;
    } else if (this.size === this.limit) {
      delete this.cacheMap[this.tail!.key as unknown as string];
      this.detach(this.tail!);
      this.size--;
    }

    // Write to head of LinkedList
    if (!this.head) {
      this.head = this.tail = new CacheNode(key, value);
    } else {
      const node = new CacheNode(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }

    // update cacheMap with LinkedList key and CacheNode reference
    this.cacheMap[key as unknown as string] = this.head;
    this.size++;
  }

  read(key: K): V | undefined {
    const existingCacheNode = this.cacheMap[key as unknown as string];
    if (existingCacheNode) {
      const value = existingCacheNode.value;
      // Make the node as new Head of LinkedList if not already
      if (this.head !== existingCacheNode) {
        // write will automatically remove the node from its position and make it a new head i.e most used
        this.write(key, value);
      }
      return value;
    }

    console.log(`Item not available in cache for key ${key}`);
    return undefined;
  }

  detach(node: CacheNode<K, V>) {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cacheMap = {};
  }

  // Invokes the callback function with every node of the chain and the index of the node.
  forEach(fn: (node: CacheNode<K, V>, counter: number) => void) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  // To iterate over LRU with a 'for...of' loop
  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}
