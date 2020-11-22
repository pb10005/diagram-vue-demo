import Nullable from "~/lib/Nullable";

export default class BinarySearchTree {
  constructor(root) {
    this.setRoot(root);
  }
  setRoot(node) {
    this.root = node;
    if (node !== null) node.onDelete = () => {};
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
      .returnOr(null);
  }
  removeNode(value) {
    this._removeNode(this.root, value);
  }
  _removeNode(root, value) {
    if (root === null) {
      return;
    }
    if (root.value > value) {
      this._removeNode(root.leftChild, value);
    } else if (root.value < value) {
      this._removeNode(root.rightChild, value);
    } else {
      if (root.leftChild !== null && root.rightChild !== null) {
        let n = this.inOrder(root.rightChild)[0];
        const tmp = n.value;
        root.id = Math.floor(Math.random() * 100000);
        root.value = tmp;
        this._removeNode(n, n.value);
      } else if (root.leftChild !== null) {
        root.id = root.leftChild.id;
        root.value = root.leftChild.value;
        root.setRightChild(root.leftChild.rightChild);
        root.setLeftChild(root.leftChild.leftChild);
      } else if (root.rightChild !== null) {
        root.id = root.rightChild.id;
        root.value = root.rightChild.value;
        root.setLeftChild(root.rightChild.leftChild);
        root.setRightChild(root.rightChild.rightChild);
      } else {
        if (root.onDelete) root.onDelete();
      }
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
