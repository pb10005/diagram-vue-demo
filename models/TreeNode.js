export default class TreeNode {
  constructor(value) {
    this.value = value;

    this.leftChild = null;
    this.rightChild = null;
  }

  add(node) {
    if (node.value <= this.value) {
      if (this.leftChild === null) {
        this.leftChild = node;
      } else {
        this.leftChild.add(node);
      }
    } else {
      if (this.rightChild === null) {
        this.rightChild = node;
      } else {
        this.rightChild.add(node);
      }
    }
  }
}
