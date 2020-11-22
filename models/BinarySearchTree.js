import Nullable from "~/lib/Nullable";

export default class BinarySearchTree {
  constructor(root) {
    this.root = root;
  }
  clear() {
    this.root = null;
  }
  addNode(node) {
    if (this.root === null) {
      this.root = node;
    } else {
      this.root.add(node);
    }
  }
  findNode(value) {
    return Nullable.of(this.root)
      .map((x) => x.search(value))
      .returnOr(false);
  }
  removeNode(node) {
    if (node.leftChild !== null && node.rightChild !== null) {
      // if node has 2 childs
      let next = this.inOrder(node.rightChild)[0];
      const tmp = node.value;
      node.value = next.value;
      next.value = tmp;
      this.removeNode(next);
    } else if (node.leftChild !== null) {
      // if node has only a left child
      node.value = node.leftChild.value;
      node.leftChild = null;
    } else if (node.rightChild !== null) {
      // if node has only a right child
      node.value = node.rightChild.value;
      node.rightChild = null;
    } else {
      // if node has no childs
      node = null;
    }
  }
  inOrder(root) {
    if (root === null) {
      return [];
    }
    return [
      ...this.inOrder(root.leftChild),
      root,
      ...this.inOrder(root.rightChild)
    ];
  }
  sort() {
    return this.inOrder(this.root);
  }
}
