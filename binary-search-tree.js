class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let curNode = this.root;
    let nodeAdded = false;
    while (!nodeAdded) {
      if (val < curNode.val) {
        if (!curNode.left) {
          curNode.left = new Node(val);
          nodeAdded = true;
        }
        curNode = curNode.left;
      } else {
        if (!curNode.right) {
          curNode.right = new Node(val);
          nodeAdded = true;
        }
        curNode = curNode.right;
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    function addNode(node) {
      if (val < node.val) {
        if (!node.left) {
          node.left = new Node(val);
        } else {
          addNode(node.left);
        }
      } else if (val > node.val) {
        if (!node.right) {
          node.right = new Node(val);
        } else {
          addNode(node.right);
        }
      }
      return node;
    }

    addNode(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) {
      return undefined;
    }

    const stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();

      if (node.val === val) {
        return node;
      }

      if (node.right) {
        stack.push(node.right);
      }

      if (node.left) {
        stack.push(node.left);
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) {
      return undefined;
    }

    function search(node) {
      if (val === node.val) {
        return node;
      } if (val > node.val) {
        if (node.right) {
          return search(node.right);
        }
      } if (node.left) {
        return search(node.left);
      }
      return undefined;
    }

    let result = search(this.root);
    return result;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = []
    function traverse(node) {
      if (!node) {
        return;
      }
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = []
    function traverse(node) {
      if (!node) {
        return;
      }
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = []
    function traverse(node) {
      if (!node) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      let node = queue.shift();
      result.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = removeNode(val, this.root);

    function removeNode(val, node) {
      if (!node) {
        return null;
      }

      if (val < node.val) {
        node.left = removeNode(val, node.left);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(val, node.right);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        let successor = findMin(node.right);
        node.val = successor.val;
        node.right = removeNode(successor.val, node.right);
        return node;
      }
    }
    
    function findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function getHeight(node) {
      if (!node) {
        return 0;
      }

      let left = getHeight(node.left);
      let right = getHeight(node.right);

      if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
        return -1;
      }

      return Math.max(left, right) + 1;
    }

    return getHeight(this.root) != -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let curNode = this.root;

    // Finding the rightmost value (greatest)
    while (curNode.right) {
      curNode = curNode.right;
    }

    // If there is a left subtree, find the rightmost value of that subtree
    if (curNode.left) {
      curNode = curNode.left;
      while (curNode.right) {
        curNode = curNode.right;
      }
      return curNode.val;
    }

    // Otherwise, find the parent of the rightmost node
    let parent = this.root;
    while (parent) {
      if (parent.right === curNode) {
        return parent.val;
      }
      parent = parent.right;
    }

    return undefined;
  }
}

module.exports = BinarySearchTree;
